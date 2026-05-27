<x-app-layout title="POS / Orders">
    <section x-data="orderPricing({
        services: @js($services->map(fn ($service) => [
            'id' => $service->id,
            'name' => $service->name,
            'price_per_kg' => (float) $service->price_per_kg,
            'max_kg' => (float) $service->max_kg,
            'drying_minutes' => $service->drying_minutes,
            'additional_charge' => (float) $service->additional_charge,
        ])->values()),
        categories: @js($itemCategories->map(fn ($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'max_kg' => (float) $category->max_kg,
            'additional_fee' => (float) $category->additional_fee,
        ])->values()),
    })" class="space-y-6">
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
                ['label' => 'Open queue', 'value' => $stats['openQueue'], 'hint' => 'Unclaimed tickets'],
                ['label' => 'Received', 'value' => $stats['received'], 'hint' => 'Waiting to wash'],
                ['label' => 'In progress', 'value' => $stats['inProgress'], 'hint' => 'Washing or drying'],
                ['label' => 'Ready pickup', 'value' => $stats['ready'], 'hint' => 'Awaiting claim'],
            ] as $card)
                <article class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(6,26,66,.16)]">
                    <p class="text-sm font-semibold text-[#5c6a86]">{{ $card['label'] }}</p>
                    <p class="mt-3 text-3xl font-extrabold text-[#061a42]">{{ $card['value'] }}</p>
                    <p class="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a98b5]">{{ $card['hint'] }}</p>
                </article>
            @endforeach
        </div>

        <div class="grid gap-6 xl:grid-cols-[380px_1fr]">
            <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                <h2 class="text-lg font-extrabold text-[#061a42]">New order</h2>
                <p class="mt-1 text-sm text-[#5c6a86]">Create a laundry ticket for the queue.</p>

                <form method="POST" action="{{ route('orders.store') }}" class="mt-5 space-y-4">
                    @csrf

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Existing customer</span>
                        <select name="customer_id" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                            <option value="">Walk-in / new customer</option>
                            @foreach ($customers as $customer)
                                <option value="{{ $customer->id }}" @selected(old('customer_id') == $customer->id)>{{ $customer->name }}</option>
                            @endforeach
                        </select>
                    </label>

                    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Customer name</span>
                            <input name="customer_name" value="{{ old('customer_name') }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Walk-in name">
                        </label>

                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Phone</span>
                            <input name="customer_phone" value="{{ old('customer_phone') }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional">
                        </label>
                    </div>

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Service</span>
                        <select name="service_id" x-model.number="serviceId" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                            <option value="">Select service</option>
                            @foreach ($services as $service)
                                <option value="{{ $service->id }}" @selected(old('service_id') == $service->id)>{{ $service->name }} - PHP {{ number_format($service->price_per_kg, 2) }}</option>
                            @endforeach
                        </select>
                    </label>

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Item category</span>
                        <select name="item_category_id" x-model.number="categoryId" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                            <option value="">Select category</option>
                            @foreach ($itemCategories as $category)
                                <option value="{{ $category->id }}" @selected(old('item_category_id') == $category->id)>{{ $category->name }} - max {{ number_format($category->max_kg, 2) }} kg</option>
                            @endforeach
                        </select>
                    </label>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Weight kg</span>
                            <input type="number" step="0.01" min="0.25" name="weight_kg" x-model.number="weightKg" value="{{ old('weight_kg') }}" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                        </label>

                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Paid</span>
                            <input type="number" step="0.01" min="0" name="paid_amount" value="{{ old('paid_amount') }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="0.00">
                        </label>
                    </div>

                    <div class="rounded-2xl bg-[#f4f7ff] p-4 text-sm">
                        <div class="mb-3 h-2 overflow-hidden rounded-full bg-[#d8e1f5]">
                            <div class="h-full rounded-full bg-[#061a42]" x-bind:style="'width: ' + Math.min(100, indicatorPercent) + '%'"></div>
                        </div>
                        <p class="font-bold text-[#061a42]" x-text="'Allowed load: ' + computed.allowedKg.toFixed(2) + ' kg'"></p>
                        <p class="mt-2 text-[#5c6a86]" x-text="'Service Price: PHP ' + computed.servicePrice.toFixed(2)"></p>
                        <p class="text-[#5c6a86]" x-text="'Additional KG Fee: PHP ' + computed.additionalCharge.toFixed(2)"></p>
                        <p class="mt-2 text-lg font-extrabold text-[#061a42]" x-text="'Total: PHP ' + computed.total.toFixed(2)"></p>
                        <p x-show="computed.warning" class="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Selected items exceed allowed load capacity.</p>
                    </div>

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Notes</span>
                        <textarea name="notes" rows="3" class="mt-2 w-full resize-none rounded-2xl border border-[#c8d3ea] bg-white px-4 py-3 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional instructions">{{ old('notes') }}</textarea>
                    </label>

                    <button class="h-12 w-full rounded-2xl bg-[#061a42] px-4 text-sm font-bold text-white transition hover:bg-[#08285f]">Add order</button>
                </form>
            </article>

            <article class="rounded-3xl border border-white/70 bg-white/90 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                <div class="flex flex-col gap-3 border-b border-[#d8e1f5] p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 class="text-lg font-extrabold text-[#061a42]">Order queue</h2>
                        <p class="mt-1 text-sm text-[#5c6a86]">Latest tickets and current wash stage.</p>
                    </div>
                    <div class="flex gap-2">
                        <a href="{{ route('pricing.index') }}" class="rounded-2xl border border-[#c8d3ea] bg-white px-4 py-3 text-sm font-bold text-[#061a42] transition hover:border-[#08285f]">Pricing</a>
                        <a href="{{ route('reports.index') }}" class="rounded-2xl bg-[#061a42] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#08285f]">Reports</a>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full min-w-[820px] text-left text-sm">
                        <thead class="bg-[#061a42] text-xs uppercase tracking-[0.08em] text-white">
                            <tr>
                                <th class="px-5 py-4 font-bold">Ticket</th>
                                <th class="px-5 py-4 font-bold">Customer</th>
                                <th class="px-5 py-4 font-bold">Service</th>
                                <th class="px-5 py-4 font-bold">Due</th>
                                <th class="px-5 py-4 font-bold">Balance</th>
                                <th class="px-5 py-4 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#d8e1f5]">
                            @forelse ($orders as $order)
                                <tr class="align-top transition hover:bg-[#f8fbff]">
                                    <td class="px-5 py-4">
                                        <p class="font-bold text-[#061a42]">{{ $order->order_number }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ number_format($order->weight_kg, 2) }} kg</p>
                                    </td>
                                    <td class="px-5 py-4">
                                        <p class="font-semibold text-[#1d2c50]">{{ $order->customer->name }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ $order->customer->phone ?: 'No phone' }}</p>
                                    </td>
                                    <td class="px-5 py-4">
                                        <p class="font-medium">{{ $order->service->name }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ $order->itemCategory?->name ?: 'No category' }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">PHP {{ number_format($order->total_amount, 2) }}</p>
                                    </td>
                                    <td class="px-5 py-4">
                                        <p class="font-medium">{{ $order->due_at?->format('M d, h:i A') }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ $order->created_at->diffForHumans() }}</p>
                                    </td>
                                    <td class="px-5 py-4">
                                        <p class="font-bold {{ $order->balance > 0 ? 'text-[#9b3d24]' : 'text-[#08285f]' }}">PHP {{ number_format($order->balance, 2) }}</p>
                                            <p class="mt-1 text-xs text-[#5c6a86]">Extra PHP {{ number_format($order->additional_charge, 2) }}</p>
                                            <p class="mt-1 text-xs text-[#5c6a86]">Paid PHP {{ number_format($order->paid_amount, 2) }}</p>
                                    </td>
                                    <td class="px-5 py-4">
                                        <form method="POST" action="{{ route('orders.status', $order) }}">
                                            @csrf
                                            @method('PATCH')
                                            <select name="status" onchange="this.form.submit()" class="h-11 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold capitalize outline-none focus:border-[#08285f]">
                                                @foreach (\App\Models\LaundryOrder::STATUSES as $status)
                                                    <option value="{{ $status }}" @selected($order->status === $status)>{{ str_replace('_', ' ', $status) }}</option>
                                                @endforeach
                                            </select>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="px-5 py-12 text-center text-[#5c6a86]">No laundry orders yet.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    </section>

    <script>
        function orderPricing(config) {
            return {
                services: config.services,
                categories: config.categories,
                serviceId: config.services[0]?.id || '',
                categoryId: config.categories[0]?.id || '',
                weightKg: 1,
                get computed() {
                    const service = this.services.find(item => item.id === Number(this.serviceId)) || {};
                    const category = this.categories.find(item => item.id === Number(this.categoryId)) || {};
                    const allowedKg = Math.min(Number(service.max_kg || 0), Number(category.max_kg || 0));
                    const weight = Number(this.weightKg || 0);
                    const extraKg = Math.max(0, weight - allowedKg);
                    const additionalCharge = extraKg > 0 ? Math.ceil(extraKg) * (Number(service.additional_charge || 0) + Number(category.additional_fee || 0)) : 0;
                    const servicePrice = Number(service.price_per_kg || 0);

                    return { allowedKg, servicePrice, additionalCharge, total: servicePrice + additionalCharge, warning: extraKg > 0 };
                },
                get indicatorPercent() {
                    return this.computed.allowedKg > 0 ? (Number(this.weightKg || 0) / this.computed.allowedKg) * 100 : 0;
                },
            };
        }
    </script>
</x-app-layout>
