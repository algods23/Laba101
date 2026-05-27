<x-app-layout title="Dashboard">
    <section class="space-y-6">
        @if (session('status'))
            <div class="rounded-2xl border border-[#9fb4e6] bg-white/80 px-5 py-4 text-sm font-semibold text-[#061a42] shadow-sm backdrop-blur">
                {{ session('status') }}
            </div>
        @endif

        @if ($errors->any())
            <div class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                <p class="font-bold">Please check the order details.</p>
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            @foreach ([
                ['label' => 'Active orders', 'value' => $stats['activeOrders'], 'hint' => 'Open queue'],
                ['label' => 'Ready pickup', 'value' => $stats['readyForPickup'], 'hint' => 'Awaiting claim'],
                ['label' => 'Paid today', 'value' => 'PHP '.number_format($stats['todaysRevenue'], 2), 'hint' => 'Collected cash'],
                ['label' => 'Customers', 'value' => $stats['customers'], 'hint' => 'Customer records'],
            ] as $card)
                <article class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(6,26,66,.16)]">
                    <p class="text-sm font-semibold text-[#5c6a86]">{{ $card['label'] }}</p>
                    <p class="mt-3 text-3xl font-extrabold text-[#061a42]">{{ $card['value'] }}</p>
                    <p class="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a98b5]">{{ $card['hint'] }}</p>
                </article>
            @endforeach
        </div>

        <section class="space-y-6">
            <div class="grid gap-6 lg:grid-cols-[1fr_320px]">
                <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                    <div class="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 class="text-lg font-extrabold text-[#061a42]">Revenue overview</h2>
                            <p class="mt-1 text-sm text-[#5c6a86]">Paid amount for the last 7 days.</p>
                        </div>
                    </div>
                    <div class="h-72">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </article>

                <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                    <h2 class="text-lg font-extrabold text-[#061a42]">Recent activities</h2>
                    <div class="mt-4 space-y-3">
                        @forelse ($activities as $activity)
                            <div class="rounded-2xl bg-[#f4f7ff] p-4">
                                <p class="text-sm font-bold text-[#061a42]">{{ $activity['title'] }}</p>
                                <p class="mt-1 text-xs text-[#5c6a86]">{{ $activity['meta'] }}</p>
                            </div>
                        @empty
                            <p class="rounded-2xl bg-[#f4f7ff] p-4 text-sm text-[#5c6a86]">No activities yet.</p>
                        @endforelse
                    </div>
                </article>
            </div>
        </section>
    </section>

    <script>
        window.addEventListener('DOMContentLoaded', () => setTimeout(() => {
            const canvas = document.getElementById('revenueChart');
            if (!canvas || !window.Chart) return;

            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: @json($revenueLabels),
                    datasets: [{
                        label: 'Revenue',
                        data: @json($revenueData),
                        borderColor: '#061a42',
                        backgroundColor: 'rgba(8, 40, 95, .12)',
                        borderWidth: 3,
                        fill: true,
                        tension: .42,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { color: 'rgba(92, 106, 134, .16)' } }
                    }
                }
            });
        }, 0));
    </script>
</x-app-layout>
