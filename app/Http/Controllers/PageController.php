<?php

namespace App\Http\Controllers;

use App\Mail\ReportMail;
use App\Models\DailySale;
use App\Models\DisbursementExpense;
use App\Models\ItemCategory;
use App\Models\LaundryOrder;
use App\Models\LaundryService;
use App\Models\Machine;
use App\Models\Subcleaning;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
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
        $dailySales = DailySale::query()->latest('sale_date')->take(20)->get();

        return view('pages.disbursements', [
            'expenses' => $expenses,
            'nextDisbursementNumber' => $this->nextDisbursementNumber(),
            'nextSaleNumber' => $this->nextSaleNumber(),
            'dailyTotal' => $expenses
                ->filter(fn (array $expense) => $expense['export_date']->isSameDay(now()))
                ->sum('amount'),
            'monthlyTotal' => $expenses
                ->filter(fn (array $expense) => $expense['export_date']->betweenIncluded(now()->startOfMonth(), now()->endOfMonth()))
                ->sum('amount'),
            'dailySales' => $dailySales,
            'todaysManualSales' => DailySale::query()->whereDate('sale_date', now()->toDateString())->sum('amount'),
            'monthlyManualSales' => DailySale::query()
                ->whereBetween('sale_date', [now()->startOfMonth()->toDateString(), now()->endOfMonth()->toDateString()])
                ->sum('amount'),
        ]);
    }

    public function storeDisbursementExpense(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'expense_date' => ['required', 'date'],
            'name' => ['required', 'string', 'max:120'],
            'category' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:500'],
            'amount' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
        ]);

        DisbursementExpense::query()->create([
            ...$validated,
            'disbursement_number' => $this->nextDisbursementNumber(),
        ]);

        return redirect()
            ->route('disbursements.index', ['tab' => 'expenses'])
            ->with('status', 'Disbursement saved.');
    }

    public function storeDailySale(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'sale_date' => ['required', 'date'],
            'cash_amount' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'gcash_amount' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $cash = (float) ($validated['cash_amount'] ?? 0);
        $gcash = (float) ($validated['gcash_amount'] ?? 0);

        $dailySale = DailySale::query()->firstOrNew(['sale_date' => CarbonImmutable::parse($validated['sale_date'])->startOfDay()]);
        $dailySale->fill([
            'sale_number' => $dailySale->sale_number ?: $this->nextSaleNumber(),
            'cash_amount' => $cash,
            'gcash_amount' => $gcash,
            'amount' => $cash + $gcash,
            'notes' => $validated['notes'] ?? null,
        ]);
        $dailySale->save();

        return redirect()
            ->route('disbursements.index', ['tab' => 'sales'])
            ->with('status', 'Daily sales total saved.');
    }

    public function maintenance(): View
    {
        // Eager-load all subcleanings for each machine, then deduplicate on the PHP side:
        // For each machine, group its subcleaning records by date. Within each date group,
        // a 'completed' record supersedes any 'in_progress' rows. The result is one
        // meaningful row per (machine, date) pair, sorted newest-first.
        $machines = Machine::query()
            ->with(['subcleanings' => function ($q) {
                $q->orderBy('date', 'desc')->orderByRaw("CASE WHEN cleaning_status = 'completed' THEN 0 ELSE 1 END");
            }])
            ->orderBy('machine_type')
            ->orderBy('machine_name')
            ->get()
            ->each(function ($machine) {
                $machine->setRelation(
                    'subcleanings',
                    $machine->subcleanings
                        ->groupBy(fn ($r) => $r->date->toDateString())
                        ->map(fn ($group) =>
                            $group->firstWhere('cleaning_status', 'completed') ?? $group->first()
                        )
                        ->sortByDesc(fn ($r) => $r->date->toDateString())
                        ->values()
                );
            });

        return view('pages.maintenance', [
            'machines' => $machines,
            'subcleanings' => Subcleaning::query()->with('machines')->latest('date')->latest()->get(),
        ]);
    }

    public function storeSubcleaning(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'machine_ids' => ['required', 'array', 'min:1'],
            'machine_ids.*' => ['exists:machines,id'],
            'cleaning_status' => ['required', 'string'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $subcleaning = Subcleaning::query()->create([
            'date' => $validated['date'],
            'cleaning_status' => $validated['cleaning_status'],
            'notes' => $validated['notes'] ?? null,
        ]);

        $subcleaning->machines()->sync($validated['machine_ids']);

        Machine::query()->whereIn('id', $validated['machine_ids'])->update([
            'status' => $validated['cleaning_status'] === 'completed' ? 'available' : 'under_cleaning',
        ]);

        return redirect()->route('maintenance.index')->with('status', 'Subcleaning record saved.');
    }

    public function completeMachine(Machine $machine): RedirectResponse
    {
        $machine->update(['status' => 'available']);

        $subcleaning = Subcleaning::query()->create([
            'date' => now()->toDateString(),
            'cleaning_status' => 'completed',
            'notes' => 'Finished cleaning via quick action',
        ]);

        $subcleaning->machines()->sync([$machine->id]);

        return back()->with('status', $machine->machine_name . ' marked as completed.');
    }

    public function storeMachine(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'machine_name' => ['required', 'string', 'max:120'],
            'machine_type' => ['required', 'in:washer,dryer'],
            'status' => ['required', 'in:available,under_cleaning,maintenance'],
        ]);

        Machine::query()->create($validated);

        return redirect()->route('maintenance.index')->with('status', 'Machine added.');
    }

    public function updateMachine(Request $request, Machine $machine): RedirectResponse
    {
        $validated = $request->validate([
            'machine_name' => ['required', 'string', 'max:120'],
            'machine_type' => ['required', 'in:washer,dryer'],
            'status' => ['required', 'in:available,under_cleaning,maintenance'],
        ]);

        $machine->update($validated);

        return redirect()->route('maintenance.index')->with('status', 'Machine updated.');
    }

    public function destroyMachine(Machine $machine): RedirectResponse
    {
        $machine->delete();

        return redirect()->route('maintenance.index')->with('status', 'Machine deleted.');
    }

    public function reports(): View
    {
        return view('pages.reports', [
            'dateScopes' => $this->dateScopes(),
            'dateRanges' => $this->dateRangeOptions(),
            'defaultDateFrom' => now()->toDateString(),
            'defaultDateTo' => now()->toDateString(),
            'reportRecipientEmail' => $this->adminReportEmail(),
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

        $fileContent = $this->generateReportContent($from, $to, $reportTypes);

        return response()->streamDownload(function () use ($fileContent) {
            echo $fileContent;
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel',
        ]);
    }

    private function generateReportContent(CarbonImmutable $from, CarbonImmutable $to, array $reportTypes): string
    {
        $salesTotal = 0.0;
        $salesCashTotal = 0.0;
        $salesGcashTotal = 0.0;
        $disbursementTotal = 0.0;
        $worksheets = [];

        if (in_array('sales', $reportTypes, true)) {
            $orders = LaundryOrder::query()
                ->with(['customer', 'service', 'itemCategory', 'payments'])
                ->whereBetween('created_at', [$from, $to])
                ->oldest()
                ->get();
            $manualSales = $this->dailySalesBetween($from, $to);

            $salesRows = [
                ['Laba101 POS Export'],
                ['Date from', $from->format('Y-m-d')],
                ['Date to', $to->format('Y-m-d')],
                [],
                ['Sales Reports'],
                ['Cash', 'GCash', 'Total Sales'],
            ];

            $salesRows[] = ['Money from Order'];
            foreach ($orders as $order) {
                ['cash' => $cashPaid, 'gcash' => $gcashPaid] = $this->orderPaymentAmounts($order);

                $salesTotal += (float) $order->paid_amount;
                $salesCashTotal += $cashPaid;
                $salesGcashTotal += $gcashPaid;

                $salesRows[] = [
                    number_format($cashPaid, 2, '.', ''),
                    number_format($gcashPaid, 2, '.', ''),
                    number_format((float) $order->paid_amount, 2, '.', ''),
                ];
            }

            $salesRows[] = [];
            $salesRows[] = ['Whole sale of day'];
            foreach ($manualSales as $dailySale) {
                $salesTotal += (float) $dailySale->amount;
                $salesCashTotal += (float) $dailySale->cash_amount;
                $salesGcashTotal += (float) $dailySale->gcash_amount;

                $salesRows[] = [
                    number_format((float) $dailySale->cash_amount, 2, '.', ''),
                    number_format((float) $dailySale->gcash_amount, 2, '.', ''),
                    number_format((float) $dailySale->amount, 2, '.', ''),
                ];
            }

            $salesRows[] = [];
            $salesRows[] = ['Total', number_format($salesCashTotal, 2, '.', ''), number_format($salesGcashTotal, 2, '.', ''), number_format($salesTotal, 2, '.', '')];
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
                ['Date', 'id#', 'Name', 'Category', 'Description', 'Amount'],
            ];

            foreach ($expenses as $expense) {
                $disbursementTotal += (float) $expense['amount'];
                $disbursementRows[] = [
                    $expense['export_date']->format('Y-m-d'),
                    $expense['disbursement_number'],
                    $expense['name'],
                    $expense['category'],
                    $expense['description'],
                    number_format((float) $expense['amount'], 2, '.', ''),
                ];
            }

            // Folding payouts: count folds per staff within the range and value each fold at 5.00
            $foldRate = 5.00;
            $foldOrders = LaundryOrder::query()
                ->whereNotNull('folded_by')
                ->whereBetween('updated_at', [$from, $to])
                ->get()
                ->groupBy('folded_by');

            $foldPayoutTotal = 0.0;
            if ($foldOrders->isNotEmpty()) {
                $disbursementRows[] = [];
                $disbursementRows[] = ['Folding payouts'];
                $disbursementRows[] = ['Staff', 'Folds', 'Rate', 'Total'];

                foreach ($foldOrders as $staffId => $group) {
                    $count = $group->count();
                    $user = User::query()->find($staffId);
                    $name = $user?->name ?? ('Staff #'.$staffId);
                    $total = $count * $foldRate;
                    $foldPayoutTotal += $total;

                    $disbursementRows[] = [
                        $name,
                        $count,
                        number_format($foldRate, 2, '.', ''),
                        number_format($total, 2, '.', ''),
                    ];
                }

                $disbursementRows[] = [];
                $disbursementRows[] = ['Folding payouts total', '', '', number_format($foldPayoutTotal, 2, '.', '')];

                // Add fold payouts into the disbursement total
                $disbursementTotal += $foldPayoutTotal;
            }

            $disbursementRows[] = ['Disbursement total', '', '', number_format($disbursementTotal, 2, '.', '')];
            $worksheets['Disbursement Reports'] = $disbursementRows;
        }

        if (in_array('summary', $reportTypes, true)) {
            if (! in_array('sales', $reportTypes, true)) {
                $salesTotals = $this->salesTotalsBetween($from, $to);
                $salesTotal = $salesTotals['total'];
                $salesCashTotal = $salesTotals['cash'];
                $salesGcashTotal = $salesTotals['gcash'];
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
                ['Total Cash:', 'Total GCash:', 'Total Sales:'],
                ['', '', ''],
                [number_format($salesCashTotal, 2, '.', ''), number_format($salesGcashTotal, 2, '.', ''), number_format($salesTotal, 2, '.', '')],
                ['', '', ''],
                ['Total Disbursement:', 'Total Profit:', 'Cash on Hand:'],
                ['', '', ''],
                [number_format($disbursementTotal, 2, '.', ''), number_format($salesTotal - $disbursementTotal, 2, '.', ''), number_format($salesCashTotal - $disbursementTotal, 2, '.', '')],
            ];
        }

        return $this->buildExcelWorkbook($worksheets);
    }

    public function staff(Request $request): View
    {
        $branch = $request->query('branch', 'Main Store');
        $staffMembers = User::query()
            ->where('role', 'staff')
            ->where('branch', $branch)
            ->latest()
            ->get();

        return view('pages.staff', [
            'staffMembers' => $staffMembers,
            'currentBranch' => $branch,
            'branches' => ['Main Store', 'Mintal Branch', 'Gensan Branch'],
        ]);
    }

    public function storeStaff(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'branch' => ['required', 'string', 'in:Main Store,Mintal Branch,Gensan Branch'],
        ]);

        User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'staff',
            'branch' => $validated['branch'],
        ]);

        return redirect()->route('staff.index', ['branch' => $validated['branch']])->with('status', 'Staff added successfully.');
    }

    public function updateStaff(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'branch' => ['required', 'string', 'in:Main Store,Mintal Branch,Gensan Branch'],
        ]);

        if ($request->filled('password')) {
            $request->validate(['password' => ['string', 'min:8']]);
            $validated['password'] = bcrypt($request->password);
        }

        $user->update($validated);

        return redirect()->route('staff.index', ['branch' => $validated['branch']])->with('status', 'Staff updated successfully.');
    }

    public function setBranch(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'branch' => ['required', 'string', 'in:Main Store,Mintal Branch,Gensan Branch'],
        ]);
        session(['active_branch' => $validated['branch']]);
        return back();
    }

    public function destroyStaff(User $user): RedirectResponse
    {
        $branch = $user->branch;
        $user->delete();

        return redirect()->route('staff.index', ['branch' => $branch])->with('status', 'Staff deleted successfully.');
    }

    public function settings(): View
    {
        return view('pages.settings', [
            'user' => auth()->user(),
        ]);
    }

    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'report_email' => ['required', 'string', 'email', 'max:255'],
        ]);

        $request->user()->update($validated);

        return redirect()->route('settings.index')->with('status', 'Report email updated successfully.');
    }

    public function emailReport(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date_scope' => ['required', 'in:today,week,month,custom'],
            'date_from' => ['required_if:date_scope,custom', 'nullable', 'date'],
            'date_to' => ['required_if:date_scope,custom', 'nullable', 'date', 'after_or_equal:date_from'],
            'report_types' => ['required', 'array', 'min:1'],
            'report_types.*' => ['in:sales,disbursement,summary'],
        ]);

        $reportEmail = $this->adminReportEmail();

        if (! $reportEmail) {
            return back()->withErrors(['email' => 'Please set the admin report email in Settings first.']);
        }

        [$from, $to] = $this->reportDateRange(
            $validated['date_scope'],
            $validated['date_from'] ?? null,
            $validated['date_to'] ?? null,
        );

        $reportTypes = $validated['report_types'];
        $filename = 'laba101-reports-'.$from->format('Y-m-d').'-to-'.$to->format('Y-m-d').'.xls';

        $fileContent = $this->generateReportContent($from, $to, $reportTypes);

        try {
            Mail::to($reportEmail)->send(new ReportMail(
                filename: $filename,
                fileContent: $fileContent,
                dateFrom: $from->format('Y-m-d'),
                dateTo: $to->format('Y-m-d'),
                reportTypes: $reportTypes,
                senderName: $request->user()->name,
                senderEmail: $request->user()->email,
            ));
        } catch (\Throwable $e) {
            return back()->withErrors([
                'email' => 'Mail sending failed. Check your Gmail SMTP settings, especially the App Password, MAIL_PORT=587, and MAIL_ENCRYPTION=tls.',
            ]);
        }

        return back()->with('status', 'Report sent to ' . $reportEmail . ' successfully!');
    }

    public function revolvingFund(): View
    {
        // Calculate the total revolving fund.
        // It seems the user wants the cash-on-hand of sales with status "revolving" to add to a box.
        $revolvingTotal = DailySale::query()
            ->where('status', 'revolving')
            ->sum('cash_amount');
            
        // Table of daily summary
        $dailySales = DailySale::query()
            ->latest('sale_date')
            ->get();
            
        return view('pages.revolving-fund', [
            'revolvingTotal' => $revolvingTotal,
            'dailySales' => $dailySales,
        ]);
    }

    public function updateDailySaleStatus(Request $request, DailySale $dailySale): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:revolving,endorsed'],
            'endorsed_to' => ['required_if:status,endorsed', 'nullable', 'string', 'max:255'],
        ]);

        $dailySale->update($validated);

        return redirect()->route('revolving-fund.index')->with('status', 'Status updated successfully.');
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
            'service_type' => ['required', Rule::in([LaundryService::TYPE_ORDER, LaundryService::TYPE_ADDON])],
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
            default => [
                CarbonImmutable::parse($dateFrom)->startOfDay(),
                CarbonImmutable::parse($dateTo)->endOfDay(),
            ],
        };
    }

    private function adminReportEmail(): ?string
    {
        $admin = User::query()->where('role', 'admin')->orderBy('id')->first();

        return $admin?->report_email ?: $admin?->email;
    }

    private function disbursementExpenses()
    {
        return DisbursementExpense::query()
            ->latest('expense_date')
            ->latest()
            ->get()
            ->map(fn (DisbursementExpense $expense) => [
                'export_date' => CarbonImmutable::parse($expense->expense_date),
                'date' => $expense->expense_date->format('M d, Y'),
                'disbursement_number' => $expense->disbursement_number,
                'name' => $expense->name,
                'category' => $expense->category,
                'description' => $expense->description,
                'amount' => (float) $expense->amount,
            ]);
    }

    private function nextDisbursementNumber(): string
    {
        return 'DISB-'.str_pad((string) (DisbursementExpense::query()->count() + 1), 2, '0', STR_PAD_LEFT);
    }

    private function nextSaleNumber(): string
    {
        return 'SALE-'.str_pad((string) (DailySale::query()->count() + 1), 2, '0', STR_PAD_LEFT);
    }

    private function salesTotalBetween(CarbonImmutable $from, CarbonImmutable $to): float
    {
        return $this->salesTotalsBetween($from, $to)['total'];
    }

    private function salesTotalsBetween(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $orderSales = (float) LaundryOrder::query()
            ->whereBetween('created_at', [$from, $to])
            ->sum('paid_amount');
        $orders = LaundryOrder::query()
            ->with('payments')
            ->whereBetween('created_at', [$from, $to])
            ->get();

        $orderCash = 0.0;
        $orderGcash = 0.0;

        foreach ($orders as $order) {
            ['cash' => $cashPaid, 'gcash' => $gcashPaid] = $this->orderPaymentAmounts($order);
            $orderCash += $cashPaid;
            $orderGcash += $gcashPaid;
        }

        $manualSalesRows = $this->dailySalesBetween($from, $to);
        $manualSales = (float) $manualSalesRows->sum('amount');
        $manualCash = (float) $manualSalesRows->sum('cash_amount');
        $manualGcash = (float) $manualSalesRows->sum('gcash_amount');

        return [
            'cash' => $orderCash + $manualCash,
            'gcash' => $orderGcash + $manualGcash,
            'total' => $orderSales + $manualSales,
        ];
    }

    private function orderPaymentAmounts(LaundryOrder $order): array
    {
        if ($order->payments->isEmpty()) {
            return [
                'cash' => (float) $order->paid_amount,
                'gcash' => 0.0,
            ];
        }

        return [
            'cash' => (float) $order->payments
                ->where('payment_method', 'cash')
                ->sum('amount'),
            'gcash' => (float) $order->payments
                ->where('payment_method', 'gcash')
                ->sum('amount'),
        ];
    }

    private function dailySalesBetween(CarbonImmutable $from, CarbonImmutable $to)
    {
        return DailySale::query()
            ->whereBetween('sale_date', [$from->toDateString(), $to->toDateString()])
            ->oldest('sale_date')
            ->get();
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
<Styles>
 <Style ss:ID="Default" ss:Name="Normal">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Arial" ss:Size="10"/>
 </Style>
 <Style ss:ID="Title">
  <Font ss:FontName="Arial" ss:Size="16" ss:Bold="1" ss:Color="#061A42"/>
  <Alignment ss:Vertical="Center"/>
 </Style>
 <Style ss:ID="MetaLabel">
  <Font ss:FontName="Arial" ss:Size="10" ss:Bold="1" ss:Color="#5C6A86"/>
  <Alignment ss:Vertical="Center"/>
 </Style>
 <Style ss:ID="MetaValue">
  <Font ss:FontName="Arial" ss:Size="10" ss:Bold="1"/>
  <Alignment ss:Vertical="Center"/>
 </Style>
 <Style ss:ID="Section">
  <Font ss:FontName="Arial" ss:Size="12" ss:Bold="1" ss:Color="#061A42"/>
  <Interior ss:Color="#EAF1FF" ss:Pattern="Solid"/>
  <Alignment ss:Vertical="Center"/>
  <Borders>
   <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C8D3EA"/>
  </Borders>
 </Style>
 <Style ss:ID="Header">
  <Font ss:FontName="Arial" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/>
  <Interior ss:Color="#061A42" ss:Pattern="Solid"/>
  <Alignment ss:Vertical="Center" ss:WrapText="1"/>
  <Borders>
   <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#061A42"/>
   <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#061A42"/>
   <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#061A42"/>
   <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#061A42"/>
  </Borders>
 </Style>
 <Style ss:ID="Cell">
  <Alignment ss:Vertical="Center" ss:WrapText="1"/>
  <Borders>
   <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
   <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
   <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
   <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
  </Borders>
 </Style>
 <Style ss:ID="Money">
  <Alignment ss:Vertical="Center"/>
  <NumberFormat ss:Format="&quot;PHP&quot; #,##0.00"/>
  <Borders>
   <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
   <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
   <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
   <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8E1F5"/>
  </Borders>
 </Style>
 <Style ss:ID="Total">
  <Font ss:FontName="Arial" ss:Size="10" ss:Bold="1" ss:Color="#061A42"/>
  <Interior ss:Color="#F8FBFF" ss:Pattern="Solid"/>
  <Alignment ss:Vertical="Center"/>
  <Borders>
   <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C8D3EA"/>
   <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C8D3EA"/>
   <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C8D3EA"/>
   <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C8D3EA"/>
  </Borders>
 </Style>
</Styles>
XML;

        foreach ($worksheets as $name => $rows) {
            $xml .= '<Worksheet ss:Name="'.$this->escapeExcelXml($name).'"><Table>';
            $xml .= $this->excelColumns();

            foreach ($rows as $row) {
                $rowStyle = $this->excelRowStyle($row);
                $height = $rowStyle === 'Title' ? 28 : ($rowStyle === 'Section' ? 24 : 22);
                $xml .= '<Row ss:Height="'.$height.'">';

                foreach ($row as $value) {
                    $type = is_numeric($value) && $value !== '' ? 'Number' : 'String';
                    $cellStyle = $this->excelCellStyle($rowStyle, $value);
                    $xml .= '<Cell ss:StyleID="'.$cellStyle.'"><Data ss:Type="'.$type.'">'.$this->escapeExcelXml((string) $value).'</Data></Cell>';
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

    private function excelColumns(): string
    {
        $widths = [125, 115, 150, 135, 135, 100, 95, 110, 110, 110, 135, 135];

        return collect($widths)
            ->map(fn (int $width) => '<Column ss:Width="'.$width.'"/>')
            ->implode('');
    }

    private function excelRowStyle(array $row): string
    {
        if ($row === []) {
            return 'Default';
        }

        $firstCell = (string) ($row[0] ?? '');

        if ($firstCell === 'Laba101 POS Export') {
            return 'Title';
        }

        if (in_array($firstCell, ['Date from', 'Date to'], true)) {
            return 'MetaLabel';
        }

        if (in_array($firstCell, ['Sales Reports', 'Manual Daily Sales', 'Disbursement Reports', 'Summary'], true)) {
            return 'Section';
        }

        if (in_array($firstCell, ['Date', 'Sales #'], true)) {
            return 'Header';
        }

        if (str_contains(strtolower($firstCell), 'total') || in_array($firstCell, ['Sales Cash', 'Sales GCash', 'Disbursement', 'Sales - Disbursement'], true)) {
            return 'Total';
        }

        return 'Cell';
    }

    private function excelCellStyle(string $rowStyle, mixed $value): string
    {
        if ($rowStyle === 'MetaLabel' && $value !== 'Date from' && $value !== 'Date to') {
            return 'MetaValue';
        }

        return $rowStyle;
    }
}
