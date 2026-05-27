<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\ItemCategory;
use App\Models\LaundryOrder;
use App\Models\LaundryService;
use App\Services\LaundryPricingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $orders = LaundryOrder::query()
            ->with(['customer', 'service'])
            ->latest()
            ->take(12)
            ->get();

        return view('dashboard', [
            'customers' => Customer::query()->orderBy('name')->get(),
            'services' => LaundryService::query()->where('is_active', true)->orderBy('name')->get(),
            'orders' => $orders,
            'revenueLabels' => collect(range(6, 0))->map(fn (int $days) => now()->subDays($days)->format('M d'))->values(),
            'revenueData' => collect(range(6, 0))->map(fn (int $days) => (float) LaundryOrder::query()
                ->whereDate('created_at', now()->subDays($days)->toDateString())
                ->sum('paid_amount'))->values(),
            'activities' => $orders->take(5)->map(fn (LaundryOrder $order) => [
                'title' => $order->order_number.' moved to '.str_replace('_', ' ', $order->status),
                'meta' => $order->customer->name.' - '.$order->created_at->diffForHumans(),
            ]),
            'stats' => [
                'activeOrders' => LaundryOrder::query()->whereNotIn('status', ['claimed'])->count(),
                'todaysRevenue' => LaundryOrder::query()->whereDate('created_at', now()->toDateString())->sum('paid_amount'),
                'readyForPickup' => LaundryOrder::query()->where('status', 'ready')->count(),
                'customers' => Customer::query()->count(),
            ],
        ]);
    }

    public function posOrders(): View
    {
        $orders = LaundryOrder::query()
            ->with(['customer', 'service', 'itemCategory'])
            ->latest()
            ->get();

        return view('pages.pos-orders', [
            'customers' => Customer::query()->orderBy('name')->get(),
            'services' => LaundryService::query()->where('is_active', true)->orderBy('name')->get(),
            'itemCategories' => ItemCategory::query()->where('is_active', true)->orderBy('name')->get(),
            'orders' => $orders,
            'stats' => [
                'openQueue' => LaundryOrder::query()->whereNotIn('status', ['claimed'])->count(),
                'received' => LaundryOrder::query()->where('status', 'received')->count(),
                'inProgress' => LaundryOrder::query()->whereIn('status', ['washing', 'drying'])->count(),
                'ready' => LaundryOrder::query()->where('status', 'ready')->count(),
            ],
        ]);
    }

    public function store(Request $request, LaundryPricingService $pricingService): RedirectResponse
    {
        $validated = $request->validate([
            'customer_id' => ['nullable', 'exists:customers,id'],
            'customer_name' => ['required_without:customer_id', 'nullable', 'string', 'max:120'],
            'customer_phone' => ['nullable', 'string', 'max:40'],
            'service_id' => ['required', 'exists:laundry_services,id'],
            'item_category_id' => ['required', 'exists:item_categories,id'],
            'weight_kg' => ['required', 'numeric', 'min:0.25', 'max:200'],
            'paid_amount' => ['nullable', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $service = LaundryService::query()->findOrFail($validated['service_id']);
        $itemCategory = ItemCategory::query()->findOrFail($validated['item_category_id']);
        $pricing = $pricingService->calculate($service, $itemCategory, (float) $validated['weight_kg']);
        $customer = empty($validated['customer_id'])
            ? Customer::query()->create([
                'name' => $validated['customer_name'],
                'phone' => $validated['customer_phone'] ?? null,
            ])
            : Customer::query()->findOrFail($validated['customer_id']);

        LaundryOrder::query()->create([
            'order_number' => $this->nextOrderNumber(),
            'customer_id' => $customer->id,
            'service_id' => $service->id,
            'item_category_id' => $itemCategory->id,
            'status' => 'received',
            'weight_kg' => $validated['weight_kg'],
            'price_per_kg' => $service->price_per_kg,
            'total_amount' => $pricing['total_price'],
            'additional_charge' => $pricing['additional_charge'],
            'paid_amount' => $validated['paid_amount'] ?? 0,
            'due_at' => now()->addHours($service->turnaround_hours),
            'notes' => trim(($validated['notes'] ?? '').($pricing['warning'] ? "\n".$pricing['warning'] : '')) ?: null,
        ]);

        return redirect()->route('pos.orders')->with('status', $pricing['warning'] ?: 'Order added to the wash queue.');
    }

    public function updateStatus(Request $request, LaundryOrder $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(LaundryOrder::STATUSES)],
        ]);

        $order->update($validated);

        return redirect()->route('pos.orders')->with('status', 'Order status updated.');
    }

    private function nextOrderNumber(): string
    {
        $prefix = 'LB'.now()->format('ymd');
        $count = LaundryOrder::query()
            ->where('order_number', 'like', $prefix.'%')
            ->count() + 1;

        return $prefix.'-'.str_pad((string) $count, 3, '0', STR_PAD_LEFT);
    }
}
