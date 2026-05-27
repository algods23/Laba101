<x-app-layout title="Disbursement">
    <section class="space-y-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">Expense control</p>
                <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Disbursements</h2>
            </div>
            <button class="rounded-2xl bg-[#061a42] px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">Add expense</button>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
            <article class="rounded-3xl bg-white/90 p-5 shadow-lg"><p class="text-sm font-bold text-[#5c6a86]">Daily expenses</p><p class="mt-3 text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($dailyTotal, 2) }}</p></article>
            <article class="rounded-3xl bg-white/90 p-5 shadow-lg"><p class="text-sm font-bold text-[#5c6a86]">Monthly expenses</p><p class="mt-3 text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($monthlyTotal, 2) }}</p></article>
            <article class="rounded-3xl bg-white/90 p-5 shadow-lg"><p class="text-sm font-bold text-[#5c6a86]">Categories</p><p class="mt-3 text-3xl font-extrabold text-[#061a42]">3</p></article>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1fr_420px]">
            <article class="rounded-3xl bg-white/90 p-5 shadow-lg">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <h3 class="text-lg font-extrabold text-[#061a42]">Expense history</h3>
                    <div class="flex flex-wrap gap-2">
                        <input type="date" class="h-11 rounded-xl border border-[#c8d3ea] px-3 text-sm">
                
                    </div>
                </div>
                <div class="mt-5 overflow-x-auto">
                    <table class="w-full min-w-[680px] text-left text-sm">
                        <thead class="bg-[#061a42] text-white"><tr><th class="px-5 py-4">Date</th><th class="px-5 py-4">Category</th><th class="px-5 py-4">Description</th><th class="px-5 py-4 text-right">Amount</th></tr></thead>
                        <tbody class="divide-y divide-[#d8e1f5]">
                            @foreach ($expenses as $expense)
                                <tr><td class="px-5 py-4">{{ $expense['date'] }}</td><td class="px-5 py-4 font-bold text-[#061a42]">{{ $expense['category'] }}</td><td class="px-5 py-4">{{ $expense['description'] }}</td><td class="px-5 py-4 text-right font-bold">PHP {{ number_format($expense['amount'], 2) }}</td></tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </article>
            <article class="rounded-3xl bg-white/90 p-5 shadow-lg">
                <h3 class="text-lg font-extrabold text-[#061a42]">Expense chart</h3>
                <div class="mt-5 h-72"><canvas id="expenseChart"></canvas></div>
            </article>
        </div>
    </section>
    <script>
        window.addEventListener('DOMContentLoaded', () => setTimeout(() => {
            const canvas = document.getElementById('expenseChart');
            if (!canvas || !window.Chart) return;
            new Chart(canvas, { type: 'doughnut', data: { labels: ['Staff payout', 'Utilities', 'Supplies'], datasets: [{ data: [1250, 3450, 2180], backgroundColor: ['#061a42', '#08285f', '#60a5fa'] }] }, options: { responsive: true, maintainAspectRatio: false } });
        }, 0));
    </script>
</x-app-layout>
