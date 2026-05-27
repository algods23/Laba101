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
            'services' => LaundryService::query()
                ->where('is_active', true)
                ->where('service_type', LaundryService::TYPE_ORDER)
                ->orderBy('name')
                ->get(),
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
            'services' => LaundryService::query()
                ->where('is_active', true)
                ->where('service_type', LaundryService::TYPE_ORDER)
                ->orderBy('name')
                ->get(),
            'addonServices' => LaundryService::query()
                ->where('is_active', true)
                ->where('service_type', LaundryService::TYPE_ADDON)
                ->orderBy('name')
                ->get(),
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
            'extra_services' => ['nullable', 'array'],
            'extra_services.*' => ['integer', 'exists:laundry_services,id'],
            'paid_amount' => ['nullable', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $service = LaundryService::query()
            ->where('service_type', LaundryService::TYPE_ORDER)
            ->findOrFail($validated['service_id']);
        $itemCategory = ItemCategory::query()->findOrFail($validated['item_category_id']);
        $addons = LaundryService::query()
            ->where('service_type', LaundryService::TYPE_ADDON)
            ->whereIn('id', $validated['extra_services'] ?? [])
            ->get();
        $pricing = $pricingService->calculate($service, $itemCategory, (float) $validated['weight_kg'], $addons);
        if (empty($validated['customer_id'])) {
            $customer = Customer::query()->create([
                'name' => $validated['customer_name'],
                'phone' => $validated['customer_phone'] ?? null,
            ]);
        } else {
            $customer = Customer::query()->findOrFail($validated['customer_id']);
            $customer->update([
                'name' => $validated['customer_name'] ?: $customer->name,
                'phone' => $validated['customer_phone'] ?? $customer->phone,
            ]);
        }

        LaundryOrder::query()->create([
            'order_number' => $this->nextOrderNumber(),
            'customer_id' => $customer->id,
            'service_id' => $service->id,
            'item_category_id' => $itemCategory->id,
            'status' => 'received',
            'workflow_completed' => [],
            'weight_kg' => $validated['weight_kg'],
            'price_per_kg' => $service->price_per_kg,
            'total_amount' => $pricing['total_price'],
            'additional_charge' => $pricing['additional_charge'],
            'extra_service_amount' => $pricing['extra_service_amount'],
            'extra_services' => $pricing['extra_services'] ?: null,
            'paid_amount' => $validated['paid_amount'] ?? 0,
            'due_at' => now()->addHours($service->turnaround_hours),
            'notes' => trim(($validated['notes'] ?? '').($pricing['warning'] ? "\n".$pricing['warning'] : '')) ?: null,
        ]);

        return redirect()->route('pos.orders')->with('status', $pricing['warning'] ?: 'Order added to the wash queue.');
    }

    public function updateStatus(Request $request, LaundryOrder $order): RedirectResponse
    {
        $stepKeys = $order->workflowStepKeys();

        $validated = $request->validate([
            'workflow_completed' => ['present', 'array'],
            'workflow_completed.*' => ['string', Rule::in($stepKeys)],
        ]);

        $completed = LaundryOrder::normalizeWorkflowCompleted($stepKeys, $validated['workflow_completed']);

        $order->update([
            'workflow_completed' => $completed,
            'status' => $order->syncStatusFromWorkflow($completed),
        ]);

        return redirect()->route('pos.orders')->with('status', 'Order progress updated.');
    }

    public function advanceWorkflow(LaundryOrder $order): RedirectResponse
    {
        $next = $order->nextWorkflowStep();

        if (! $next) {
            return redirect()->route('pos.orders')->with('status', 'All steps are already completed.');
        }

        $stepKeys = $order->workflowStepKeys();
        $completed = array_merge($order->workflow_completed ?? [], [$next['key']]);
        $completed = LaundryOrder::normalizeWorkflowCompleted($stepKeys, $completed);

        $order->update([
            'workflow_completed' => $completed,
            'status' => $order->syncStatusFromWorkflow($completed),
        ]);

        return redirect()->route('pos.orders')->with('status', $order->actionLabelForStep($next['key']).' — done.');
    }

    public function recordPayment(Request $request, LaundryOrder $order): RedirectResponse
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],
            'payment_method' => ['required', Rule::in(['cash', 'gcash'])],
            'payment_reference' => ['nullable', 'required_if:payment_method,gcash', 'string', 'max:120'],
        ]);

        $amount = min((float) $order->balance, (float) $validated['amount']);

        if ($amount <= 0 || $order->balance <= 0) {
            return redirect()->route('pos.orders')->with('status', 'This order has no balance due.');
        }

        $order->update([
            'paid_amount' => min((float) $order->total_amount, (float) $order->paid_amount + $amount),
            'payment_method' => $validated['payment_method'],
            'payment_reference' => $validated['payment_method'] === 'gcash'
                ? $validated['payment_reference']
                : null,
        ]);

        return redirect()->route('pos.orders')->with('status', ucfirst($validated['payment_method']).' payment of PHP '.number_format($amount, 2).' recorded.');
    }

    private function nextOrderNumber(): string
    {
        $prefix = 'LB'.now()->format('ymd');

        // Order numbers are globally unique; ignore branch scope when finding the next sequence.
        $lastOrderNumber = LaundryOrder::withoutGlobalScope('branch')
            ->where('order_number', 'like', $prefix.'-%')
            ->orderByDesc('order_number')
            ->value('order_number');

        $sequence = $lastOrderNumber
            ? ((int) substr($lastOrderNumber, -3)) + 1
            : 1;

        return $prefix.'-'.str_pad((string) $sequence, 3, '0', STR_PAD_LEFT);
    }
}
