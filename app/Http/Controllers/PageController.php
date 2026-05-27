<?php

namespace App\Http\Controllers;

use App\Models\ItemCategory;
use App\Models\LaundryOrder;
use App\Models\LaundryService;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PageController extends Controller
{
    public function pricing(): View
    {
        return view('pages.pricing', [
            'services' => LaundryService::query()->orderBy('name')->get(),
            'itemCategories' => ItemCategory::query()->orderBy('name')->get(),
        ]);
    }

    public function storeService(Request $request): RedirectResponse
    {
        LaundryService::query()->create($this->validateService($request));

        return redirect()->route('pricing.index')->with('status', 'Service added.');
    }

    public function updateService(Request $request, LaundryService $service): RedirectResponse
    {
        $service->update($this->validateService($request));

        return redirect()->route('pricing.index')->with('status', 'Service updated.');
    }

    public function destroyService(LaundryService $service): RedirectResponse
    {
        $service->update(['is_active' => false]);

        return redirect()->route('pricing.index')->with('status', 'Service deactivated.');
    }

    public function storeItemCategory(Request $request): RedirectResponse
    {
        ItemCategory::query()->create($this->validateItemCategory($request));

        return redirect()->route('pricing.index')->with('status', 'Item category added.');
    }

    public function updateItemCategory(Request $request, ItemCategory $itemCategory): RedirectResponse
    {
        $itemCategory->update($this->validateItemCategory($request));

        return redirect()->route('pricing.index')->with('status', 'Item category updated.');
    }

    public function destroyItemCategory(ItemCategory $itemCategory): RedirectResponse
    {
        $itemCategory->update(['is_active' => false]);

        return redirect()->route('pricing.index')->with('status', 'Item category deactivated.');
    }

    public function disbursements(): View
    {
        $expenses = $this->disbursementExpenses();

        return view('pages.disbursements', [
            'expenses' => $expenses,
            'dailyTotal' => $expenses->where('date', now()->format('M d, Y'))->sum('amount'),
            'monthlyTotal' => $expenses->sum('amount'),
        ]);
    }

    public function reports(): View
    {
        return view('pages.reports', [
            'dateScopes' => $this->dateScopes(),
            'dateRanges' => $this->dateRangeOptions(),
            'defaultDateFrom' => now()->toDateString(),
            'defaultDateTo' => now()->toDateString(),
        ]);
    }

    public function exportReports(Request $request): StreamedResponse|RedirectResponse
    {
        $validated = $request->validate([
            'date_scope' => ['required', 'in:today,week,month,custom'],
            'date_from' => ['required_if:date_scope,custom', 'nullable', 'date'],
            'date_to' => ['required_if:date_scope,custom', 'nullable', 'date', 'after_or_equal:date_from'],
            'report_types' => ['required', 'array', 'min:1'],
            'report_types.*' => ['in:sales,disbursement,summary'],
        ]);

        [$from, $to] = $this->reportDateRange(
            $validated['date_scope'],
            $validated['date_from'] ?? null,
            $validated['date_to'] ?? null,
        );

        $reportTypes = $validated['report_types'];
        $filename = 'laba101-reports-'.$from->format('Y-m-d').'-to-'.$to->format('Y-m-d').'.xls';

        return response()->streamDownload(function () use ($from, $to, $reportTypes) {
            $salesTotal = 0.0;
            $disbursementTotal = 0.0;
            $worksheets = [];

            if (in_array('sales', $reportTypes, true)) {
                $orders = LaundryOrder::query()
                    ->with(['customer', 'service', 'itemCategory'])
                    ->whereBetween('created_at', [$from, $to])
                    ->oldest()
                    ->get();

                $salesRows = [
                    ['Laba101 POS Export'],
                    ['Date from', $from->format('Y-m-d')],
                    ['Date to', $to->format('Y-m-d')],
                    [],
                    ['Sales Reports'],
                    ['Date', 'Order No.', 'Customer', 'Service', 'Item Category', 'Status', 'Weight KG', 'Total Amount', 'Paid Amount', 'Balance'],
                ];

                foreach ($orders as $order) {
                    $salesTotal += (float) $order->paid_amount;
                    $salesRows[] = [
                        $order->created_at->format('Y-m-d h:i A'),
                        $order->order_number,
                        $order->customer?->name,
                        $order->service?->name,
                        $order->itemCategory?->name,
                        str($order->status)->headline(),
                        $order->weight_kg,
                        number_format((float) $order->total_amount, 2, '.', ''),
                        number_format((float) $order->paid_amount, 2, '.', ''),
                        number_format($order->balance, 2, '.', ''),
                    ];
                }

                $salesRows[] = ['Sales total', '', '', '', '', '', '', '', number_format($salesTotal, 2, '.', '')];
                $worksheets['Sales Reports'] = $salesRows;
            }

            if (in_array('disbursement', $reportTypes, true)) {
                $expenses = $this->disbursementExpenses()
                    ->filter(fn (array $expense) => $expense['export_date']->betweenIncluded($from, $to))
                    ->values();

                $disbursementRows = [
                    ['Laba101 POS Export'],
                    ['Date from', $from->format('Y-m-d')],
                    ['Date to', $to->format('Y-m-d')],
                    [],
                    ['Disbursement Reports'],
                    ['Date', 'Category', 'Description', 'Amount'],
                ];

                foreach ($expenses as $expense) {
                    $disbursementTotal += (float) $expense['amount'];
                    $disbursementRows[] = [
                        $expense['export_date']->format('Y-m-d'),
                        $expense['category'],
                        $expense['description'],
                        number_format((float) $expense['amount'], 2, '.', ''),
                    ];
                }

                $disbursementRows[] = ['Disbursement total', '', '', number_format($disbursementTotal, 2, '.', '')];
                $worksheets['Disbursement Reports'] = $disbursementRows;
            }

            if (in_array('summary', $reportTypes, true)) {
                if (! in_array('sales', $reportTypes, true)) {
                    $salesTotal = (float) LaundryOrder::query()
                        ->whereBetween('created_at', [$from, $to])
                        ->sum('paid_amount');
                }

                if (! in_array('disbursement', $reportTypes, true)) {
                    $disbursementTotal = (float) $this->disbursementExpenses()
                        ->filter(fn (array $expense) => $expense['export_date']->betweenIncluded($from, $to))
                        ->sum('amount');
                }

                $worksheets['Summary'] = [
                    ['Laba101 POS Export'],
                    ['Date from', $from->format('Y-m-d')],
                    ['Date to', $to->format('Y-m-d')],
                    [],
                    ['Summary'],
                    ['Sales', number_format($salesTotal, 2, '.', '')],
                    ['Disbursement', number_format($disbursementTotal, 2, '.', '')],
                    ['Sales - Disbursement', number_format($salesTotal - $disbursementTotal, 2, '.', '')],
                ];
            }

            echo $this->buildExcelWorkbook($worksheets);
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel',
        ]);
    }

    public function settings(): View
    {
        return view('pages.settings');
    }

    public function placeholder(string $page): View
    {
        return view('pages.placeholder', [
            'title' => str($page)->replace('-', ' ')->title(),
        ]);
    }

    private function validateService(Request $request): array
    {
        $request->merge([
            'includes' => $request->input('includes', []),
            'additional_charge' => $request->input('additional_charge', 0),
            'rush_fee' => $request->input('rush_fee', 0),
            'delivery_fee' => $request->input('delivery_fee', 0),
        ]);

        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:80'],
            'price_per_kg' => ['required', 'numeric', 'min:0', 'max:999999'],
            'max_kg' => ['required', 'numeric', 'min:0.25', 'max:999999'],
            'drying_minutes' => ['nullable', 'integer', 'min:1', 'max:9999'],
            'includes' => ['nullable', 'array'],
            'includes.*' => ['string', 'max:80'],
            'additional_charge' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'rush_fee' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'delivery_fee' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'turnaround_hours' => ['required', 'integer', 'min:1', 'max:720'],
            'is_active' => ['required', 'boolean'],
        ]);
    }

    private function validateItemCategory(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'max_kg' => ['required', 'numeric', 'min:0.25', 'max:999999'],
            'additional_fee' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'is_active' => ['required', 'boolean'],
        ]);
    }

    private function dateScopes(): array
    {
        return [
            'today' => 'Current',
            'week' => 'Week',
            'month' => 'Month',
            'custom' => 'Custom',
        ];
    }

    private function dateRangeOptions(): array
    {
        $today = CarbonImmutable::today();

        return [
            'today' => [
                'from' => $today->toDateString(),
                'to' => $today->toDateString(),
            ],
            'week' => [
                'from' => $today->startOfWeek()->toDateString(),
                'to' => $today->endOfWeek()->toDateString(),
            ],
            'month' => [
                'from' => $today->startOfMonth()->toDateString(),
                'to' => $today->endOfMonth()->toDateString(),
            ],
        ];
    }

    private function reportDateRange(string $scope, ?string $dateFrom, ?string $dateTo): array
    {
        $today = CarbonImmutable::today();

        return match ($scope) {
            'week' => [$today->startOfWeek(), $today->endOfWeek()],
            'month' => [$today->startOfMonth(), $today->endOfMonth()],
            'custom' => [
                CarbonImmutable::parse($dateFrom)->startOfDay(),
                CarbonImmutable::parse($dateTo)->endOfDay(),
            ],
            default => [$today->startOfDay(), $today->endOfDay()],
        };
    }

    private function disbursementExpenses()
    {
        return collect([
            ['export_date' => CarbonImmutable::today(), 'category' => 'Staff payout', 'description' => 'Washer shift payout', 'amount' => 1250],
            ['export_date' => CarbonImmutable::today()->subDay(), 'category' => 'Supplies', 'description' => 'Detergent and softener refill', 'amount' => 2180],
            ['export_date' => CarbonImmutable::today()->subDays(2), 'category' => 'Utilities', 'description' => 'Water bill partial payment', 'amount' => 3450],
        ])->map(fn (array $expense) => [
            ...$expense,
            'date' => $expense['export_date']->format('M d, Y'),
        ]);
    }

    private function buildExcelWorkbook(array $worksheets): string
    {
        $xml = <<<'XML'
<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
XML;

        foreach ($worksheets as $name => $rows) {
            $xml .= '<Worksheet ss:Name="'.$this->escapeExcelXml($name).'"><Table>';

            foreach ($rows as $row) {
                $xml .= '<Row>';

                foreach ($row as $value) {
                    $type = is_numeric($value) && $value !== '' ? 'Number' : 'String';
                    $xml .= '<Cell><Data ss:Type="'.$type.'">'.$this->escapeExcelXml((string) $value).'</Data></Cell>';
                }

                $xml .= '</Row>';
            }

            $xml .= '</Table></Worksheet>';
        }

        return $xml.'</Workbook>';
    }

    private function escapeExcelXml(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES | ENT_XML1, 'UTF-8');
    }
}
