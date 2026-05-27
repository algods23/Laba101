<x-app-layout title="Daily Report">
    <section class="space-y-4 md:space-y-6" x-data="{ activeTab: '{{ request('tab', 'expenses') === 'sales' ? 'sales' : 'expenses' }}' }">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 class="mt-2 text-2xl md:text-3xl font-extrabold text-[#061a42]">Daily Report</h2>
            </div>
            <div class="flex overflow-x-auto rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white/90 p-1 shadow-lg">
                <button type="button" class="whitespace-nowrap rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 text-xs md:text-sm font-bold transition" :class="activeTab === 'expenses' ? 'bg-[#061a42] text-white' : 'text-[#061a42]'" @click="activeTab = 'expenses'">Disbursements</button>
                <button type="button" class="whitespace-nowrap rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 text-xs md:text-sm font-bold transition" :class="activeTab === 'sales' ? 'bg-[#061a42] text-white' : 'text-[#061a42]'" @click="activeTab = 'sales'">Daily Sales</button>
            </div>
        </div>

        @if (session('status'))
            <div class="rounded-xl md:rounded-2xl border border-green-200 bg-green-50 p-3 md:p-4 text-xs md:text-sm font-semibold text-green-700">
                {{ session('status') }}
            </div>
        @endif

        @if ($errors->any())
            <div class="rounded-xl md:rounded-2xl border border-red-200 bg-red-50 p-3 md:p-4 text-xs md:text-sm font-semibold text-red-700">
                {{ $errors->first() }}
            </div>
        @endif

        <div class="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
            <article class="rounded-2xl md:rounded-3xl bg-white/90 p-3 md:p-5 shadow-lg"><p class="text-[10px] md:text-sm font-bold text-[#5c6a86]">Daily disbursement</p><p class="mt-1 md:mt-3 text-lg md:text-2xl xl:text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($dailyTotal, 2) }}</p></article>
            <article class="rounded-2xl md:rounded-3xl bg-white/90 p-3 md:p-5 shadow-lg"><p class="text-[10px] md:text-sm font-bold text-[#5c6a86]">Monthly disbursement</p><p class="mt-1 md:mt-3 text-lg md:text-2xl xl:text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($monthlyTotal, 2) }}</p></article>
            <article class="rounded-2xl md:rounded-3xl bg-white/90 p-3 md:p-5 shadow-lg"><p class="text-[10px] md:text-sm font-bold text-[#5c6a86]">Today sales input</p><p class="mt-1 md:mt-3 text-lg md:text-2xl xl:text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($todaysManualSales, 2) }}</p></article>
            <article class="rounded-2xl md:rounded-3xl bg-white/90 p-3 md:p-5 shadow-lg"><p class="text-[10px] md:text-sm font-bold text-[#5c6a86]">Month sales input</p><p class="mt-1 md:mt-3 text-lg md:text-2xl xl:text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($monthlyManualSales, 2) }}</p></article>
        </div>

        <div x-show="activeTab === 'expenses'" x-cloak>
            <div class="grid gap-4 md:gap-6 xl:grid-cols-[380px_1fr]">
                <form method="POST" action="{{ route('disbursement-expenses.store') }}" class="rounded-2xl md:rounded-3xl bg-white/90 p-4 md:p-5 shadow-lg">
                    @csrf
                    <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Input disbursement</h3>
                    <div class="mt-4 space-y-3 md:space-y-4">
                   
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Date</span>
                            <input type="date" name="expense_date" value="{{ old('expense_date', now()->toDateString()) }}" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" required>
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Name</span>
                            <input name="name" value="{{ old('name') }}" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Name" required>
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Category</span>
                            <input name="category" value="{{ old('category') }}" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Supplies, Utilities, Staff payout" required>
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Amount</span>
                            <input type="number" name="amount" value="{{ old('amount') }}" step="0.01" min="0" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="0.00" required>
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Description</span>
                            <textarea name="description" rows="2" class="mt-1 md:mt-2 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional">{{ old('description') }}</textarea>
                        </label>
                        <button class="w-full rounded-xl md:rounded-2xl bg-[#061a42] px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">Save disbursement</button>
                    </div>
                </form>

                <article class="rounded-2xl md:rounded-3xl bg-white/90 p-4 md:p-5 shadow-lg">
                    <div class="flex flex-wrap items-center justify-between gap-2 md:gap-3">
                        <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Disbursement history</h3>
                    </div>
                    <div class="mt-4 md:mt-5 overflow-hidden">
                        <table class="w-full table-fixed text-left text-[11px] md:text-xs xl:text-sm">
                            <thead class="bg-[#061a42] text-white"><tr><th class="w-[15%] px-2 py-3 font-bold">Date</th><th class="w-[17%] px-2 py-3 font-bold">Disbursement #</th><th class="w-[16%] px-2 py-3 font-bold">Name</th><th class="w-[16%] px-2 py-3 font-bold">Category</th><th class="w-[21%] px-2 py-3 font-bold">Description</th><th class="w-[15%] px-2 py-3 text-right font-bold">Amount</th></tr></thead>
                            <tbody class="divide-y divide-[#d8e1f5]">
                                @forelse ($expenses as $expense)
                                    <tr><td class="break-words px-2 py-3">{{ $expense['date'] }}</td><td class="break-words px-2 py-3 font-bold text-[#061a42]">{{ $expense['disbursement_number'] }}</td><td class="break-words px-2 py-3">{{ $expense['name'] }}</td><td class="break-words px-2 py-3 font-bold text-[#061a42]">{{ $expense['category'] }}</td><td class="break-words px-2 py-3">{{ $expense['description'] }}</td><td class="break-words px-2 py-3 text-right font-bold">PHP {{ number_format($expense['amount'], 2) }}</td></tr>
                                @empty
                                    <tr><td colspan="6" class="px-3 py-8 md:px-5 md:py-12 text-center text-[#5c6a86]">No disbursements yet.</td></tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </article>
            </div>
        </div>

        <div x-show="activeTab === 'sales'" x-cloak>
            <div class="grid gap-4 md:gap-6 xl:grid-cols-[380px_1fr]">
                <form method="POST" action="{{ route('daily-sales.store') }}" class="rounded-2xl md:rounded-3xl bg-white/90 p-4 md:p-5 shadow-lg">
                    @csrf
                    <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Input total sale</h3>
                    <div class="mt-4 space-y-3 md:space-y-4">
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Date</span>
                            <input type="date" name="sale_date" value="{{ old('sale_date', now()->toDateString()) }}" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" required>
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Cash sales</span>
                            <input type="number" name="cash_amount" value="{{ old('cash_amount') }}" step="0.01" min="0" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="0.00">
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">GCash sales</span>
                            <input type="number" name="gcash_amount" value="{{ old('gcash_amount') }}" step="0.01" min="0" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="0.00">
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Notes</span>
                            <textarea name="notes" rows="2" class="mt-1 md:mt-2 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional">{{ old('notes') }}</textarea>
                        </label>
                        <button class="w-full rounded-xl md:rounded-2xl bg-[#061a42] px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">Save daily sale</button>
                    </div>
                </form>

                <article class="rounded-2xl md:rounded-3xl bg-white/90 p-4 md:p-5 shadow-lg">
                    <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Daily sales history</h3>
                    <div class="mt-4 md:mt-5 overflow-hidden">
                        <table class="w-full table-fixed text-left text-[11px] md:text-xs xl:text-sm">
                            <thead class="bg-[#061a42] text-white"><tr><th class="w-[13%] px-2 py-3 font-bold">Sales #</th><th class="w-[14%] px-2 py-3 font-bold">Date</th><th class="w-[13%] px-2 py-3 text-right font-bold">Cash</th><th class="w-[13%] px-2 py-3 text-right font-bold">GCash</th><th class="w-[15%] px-2 py-3 text-right font-bold">Total sale</th><th class="w-[16%] px-2 py-3 font-bold">Notes</th><th class="w-[16%] px-2 py-3 font-bold">Updated</th></tr></thead>
                            <tbody class="divide-y divide-[#d8e1f5]">
                                @forelse ($dailySales as $sale)
                                    <tr>
                                        <td class="break-words px-2 py-3 font-bold text-[#061a42]">{{ $sale->sale_number }}</td>
                                        <td class="break-words px-2 py-3 font-bold text-[#061a42]">{{ $sale->sale_date->format('M d, Y') }}</td>
                                        <td class="break-words px-2 py-3 text-right">PHP {{ number_format((float) $sale->cash_amount, 2) }}</td>
                                        <td class="break-words px-2 py-3 text-right">PHP {{ number_format((float) $sale->gcash_amount, 2) }}</td>
                                        <td class="break-words px-2 py-3 text-right font-bold text-green-700">PHP {{ number_format((float) $sale->amount, 2) }}</td>
                                        <td class="break-words px-2 py-3">{{ $sale->notes ?: '-' }}</td>
                                        <td class="break-words px-2 py-3 text-[#5c6a86]">{{ $sale->updated_at->format('M d, Y h:i A') }}</td>
                                    </tr>
                                @empty
                                    <tr><td colspan="7" class="px-3 py-8 md:px-5 md:py-12 text-center text-[#5c6a86]">No daily sales totals yet.</td></tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </article>
            </div>
        </div>
    </section>
</x-app-layout>
