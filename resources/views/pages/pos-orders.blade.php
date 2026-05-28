<x-app-layout title="POS / Orders">
    <section x-data="orderPricing({
        services: @js($services->map(fn ($service) => [
            'id' => $service->id,
            'name' => $service->name,
            'description' => $service->description,
            'price_per_kg' => (float) $service->price_per_kg,
            'max_kg' => (float) $service->max_kg,
            'drying_minutes' => $service->drying_minutes,
            'additional_charge' => (float) $service->additional_charge,
            'turnaround_hours' => (int) $service->turnaround_hours,
            'default_category' => str_contains($service->name, 'Comforter') ? 'Comforter' : 'Regular Clothes',
        ])->values()),
        categories: @js($itemCategories->map(fn ($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'max_kg' => (float) $category->max_kg,
            'additional_fee' => (float) $category->additional_fee,
        ])->values()),
        addons: @js($addonServices->map(fn ($addon) => [
            'id' => $addon->id,
            'name' => $addon->name,
            'price' => (float) $addon->price_per_kg,
        ])->values()),
        initialServiceId: @js(old('service_id')),
        initialCategoryId: @js(old('item_category_id')),
        initialWeight: @js(old('weight_kg', 1)),
        initialAddons: @js(old('extra_services', [])),
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

        <div class="grid gap-6 lg:grid-cols-12">
            <article class="lg:col-span-5 xl:col-span-4 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                <h2 class="text-lg font-extrabold text-[#061a42]">New order</h2>
                <p class="mt-1 text-sm text-[#5c6a86]">Create a laundry ticket for the queue.</p>

                <form method="POST" action="{{ route('orders.store') }}" class="mt-5 space-y-4">
                    @csrf

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Existing customer</span>
                        <select name="customer_id" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                            <option value="">Walk-in / new customer</option>
                            @foreach ($customers as $customer)
                                <option
                                    value="{{ $customer->id }}"
                                    data-customer-name="{{ $customer->name }}"
                                    data-customer-phone="{{ $customer->phone }}"
                                    @selected(old('customer_id') == $customer->id)
                                >{{ $customer->name }}</option>
                            @endforeach
                        </select>
                    </label>

                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Customer name</span>
                            <input
                                name="customer_name"
                                value="{{ old('customer_name') }}"
                                class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]"
                                placeholder="Walk-in name"
                            >
                        </label>

                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Phone</span>
                            <input name="customer_phone" value="{{ old('customer_phone') }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional">
                        </label>
                    </div>

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Service</span>
                        <select name="service_id" x-model.number="serviceId" x-on:change="onServiceChange()" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                            <option value="">Select service</option>
                            @foreach ($services as $service)
                                <option value="{{ $service->id }}" @selected(old('service_id') == $service->id)>{{ $service->name }} - PHP {{ number_format($service->price_per_kg, 2) }}</option>
                            @endforeach
                        </select>
                        <p x-show="selectedService?.description" x-text="selectedService?.description" class="mt-2 text-xs text-[#5c6a86]"></p>
                    </label>

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Item category</span>
                        <select name="item_category_id" x-model.number="categoryId" x-on:change="onCategoryChange()" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]">
                            <option value="">Select category</option>
                            @foreach ($itemCategories as $category)
                                <option value="{{ $category->id }}" @selected(old('item_category_id') == $category->id)>{{ $category->name }} - max {{ number_format($category->max_kg, 2) }} kg</option>
                            @endforeach
                        </select>
                    </label>

                    @if ($addonServices->isNotEmpty())
                        <div class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Extra services</span>
                            <div class="mt-2 space-y-2 rounded-2xl border border-[#c8d3ea] bg-white p-3">
                                @foreach ($addonServices as $addon)
                                    <label class="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-2 py-2 transition hover:bg-[#f4f7ff]">
                                        <span class="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                name="extra_services[]"
                                                value="{{ $addon->id }}"
                                                x-model="selectedAddons"
                                                class="h-4 w-4 rounded border-[#c8d3ea] text-[#061a42] focus:ring-[#08285f]"
                                            >
                                            <span class="text-sm font-semibold text-[#061a42]">{{ $addon->name }}</span>
                                        </span>
                                        <span class="text-sm font-bold text-[#5c6a86]">+ PHP {{ number_format($addon->price_per_kg, 2) }}</span>
                                    </label>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <div class="grid gap-4 sm:grid-cols-2">
                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Weight kg</span>
                            <input
                                type="number"
                                step="0.01"
                                min="0.25"
                                name="weight_kg"
                                x-model.number="weightKg"
                                x-bind:max="computed.allowedKg > 0 ? computed.allowedKg * 3 : 200"
                                required
                                class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]"
                            >
                            <p class="mt-1 text-xs text-[#5c6a86]" x-text="'Max for this category: ' + (computed.allowedKg > 0 ? computed.allowedKg.toFixed(2) + ' kg' : 'select category')"></p>
                        </label>

                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Paid</span>
                            <input type="number" step="0.01" min="0" name="paid_amount" value="{{ old('paid_amount') }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="0.00">
                        </label>
                    </div>

                    <div class="rounded-2xl bg-[#f4f7ff] p-4 text-sm">
                        <div class="mb-3 h-2 overflow-hidden rounded-full bg-[#d8e1f5]">
                            <div class="h-full rounded-full transition-all" x-bind:class="computed.warning ? 'bg-red-500' : 'bg-[#061a42]'" x-bind:style="'width: ' + Math.min(100, indicatorPercent) + '%'"></div>
                        </div>
                        <p class="font-bold text-[#061a42]" x-text="computed.categoryLabel"></p>
                        <p class="mt-1 text-[#5c6a86]" x-text="'Base service: PHP ' + computed.servicePrice.toFixed(2)"></p>
                        <p class="text-[#5c6a86]" x-show="computed.extraServiceAmount > 0" x-text="'Extra services: PHP ' + computed.extraServiceAmount.toFixed(2)"></p>
                        <p class="text-[#5c6a86]" x-show="computed.additionalCharge > 0" x-text="'Overweight fee: PHP ' + computed.additionalCharge.toFixed(2)"></p>
                        <p class="mt-1 text-xs text-[#5c6a86]" x-show="selectedService?.turnaround_hours" x-text="'Estimated ready: ~' + selectedService.turnaround_hours + ' hour(s)'"></p>
                        <p class="mt-2 text-lg font-extrabold text-[#061a42]" x-text="'Total: PHP ' + computed.total.toFixed(2)"></p>
                        <p x-show="computed.warning" x-text="computed.warning" class="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700"></p>
                    </div>

                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#5c6a86]">Notes</span>
                        <textarea name="notes" rows="3" class="mt-2 w-full resize-none rounded-2xl border border-[#c8d3ea] bg-white px-4 py-3 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional instructions">{{ old('notes') }}</textarea>
                    </label>

                    <button class="h-12 w-full rounded-2xl bg-[#061a42] px-4 text-sm font-bold text-white transition hover:bg-[#08285f]">Add order</button>
                </form>
            </article>

            <article class="lg:col-span-7 xl:col-span-8 rounded-3xl border border-white/70 bg-white/90 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                <div class="flex flex-col gap-3 border-b border-[#d8e1f5] p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 class="text-lg font-extrabold text-[#061a42]">Order queue</h2>
                        <p class="mt-1 text-sm text-[#5c6a86]">Latest tickets and current wash stage.</p>
                    </div>
    
                </div>

                <div class="overflow-x-hidden">
                    <table class="w-full table-fixed text-left text-sm">
                        <thead class="bg-[#061a42] text-xs uppercase tracking-[0.08em] text-white">
                            <tr>
                                <th class="w-[16%] px-3 py-4 font-bold">Ticket</th>
                                <th class="w-[15%] px-3 py-4 font-bold">Customer</th>
                                <th class="w-[19%] px-3 py-4 font-bold">Service</th>
                                <th class="w-[15%] px-3 py-4 font-bold">Due</th>
                                <th class="w-[17%] px-3 py-4 font-bold">Balance</th>
                                <th class="w-[18%] px-3 py-4 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($orders as $order)
                                @php $nextStep = $order->nextWorkflowStep(); @endphp
                                <tr class="align-top border-t border-[#d8e1f5] transition hover:bg-[#f8fbff]">
                                    <td class="break-words px-3 py-4">
                                        <p class="font-bold text-[#061a42]">{{ $order->order_number }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ number_format($order->weight_kg, 2) }} kg</p>
                                    </td>
                                    <td class="break-words px-3 py-4">
                                        <p class="font-semibold text-[#1d2c50]">{{ $order->customer->name }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ $order->customer->phone ?: 'No phone' }}</p>
                                    </td>
                                    <td class="break-words px-3 py-4">
                                        <p class="font-medium">{{ $order->service->name }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ $order->itemCategory?->name ?: 'No category' }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">PHP {{ number_format($order->total_amount, 2) }}</p>
                                        @if ($order->extra_service_amount > 0)
                                            <p class="mt-1 text-xs text-[#5c6a86]">Add-ons PHP {{ number_format($order->extra_service_amount, 2) }}</p>
                                        @endif
                                    </td>
                                    <td class="break-words px-3 py-4">
                                        <p class="font-medium">{{ $order->due_at?->format('M d, h:i A') }}</p>
                                        <p class="mt-1 text-xs text-[#5c6a86]">{{ $order->created_at->diffForHumans() }}</p>
                                    </td>
                                    <td class="px-3 py-4">
                                        <div class="flex flex-col gap-2">
                                            <div>
                                                <p class="font-bold {{ $order->balance > 0 ? 'text-[#9b3d24]' : 'text-[#08285f]' }}">PHP {{ number_format($order->balance, 2) }}</p>
                                                <p class="mt-1 text-xs text-[#5c6a86]">Paid PHP {{ number_format($order->paid_amount, 2) }}</p>
                                                @if ($order->payments->isNotEmpty())
                                                    <div class="mt-2 space-y-1">
                                                        <a href="{{ route('orders.receipt', $order) }}" target="_blank" class="inline-flex rounded-lg bg-white px-2 py-1 text-[10px] font-extrabold leading-tight text-[#08285f] underline">
                                                            Receipt
                                                        </a>
                                                        @foreach ($order->payments as $payment)
                                                            <div class="rounded-xl bg-[#f4f7ff] px-2 py-1.5 text-[10px] font-bold leading-tight text-[#5c6a86]">
                                                                <p>{{ strtoupper($payment->payment_method) }} PHP {{ number_format($payment->amount, 2) }}</p>
                                                                @if ($payment->payment_reference)
                                                                    <p class="mt-0.5">Ref {{ $payment->payment_reference }}</p>
                                                                @endif
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                @endif
                                            </div>
                                            @if ($order->balance > 0)
                                                <span class="w-fit rounded-xl bg-[#fff1f0] px-3 py-2 text-xs font-bold text-[#9b3d24]">Unpaid</span>
                                            @else
                                                <span class="w-fit rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">Paid</span>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="px-3 py-4" x-data="{ showPayment: false, paymentMethod: 'cash' }">
                                        <div class="flex flex-col gap-2">
                                            @if ($order->balance > 0)
                                                <button
                                                    type="button"
                                                    x-on:click="showPayment = true"
                                                    class="w-full rounded-2xl border border-[#08285f] bg-white px-3 py-2.5 text-xs font-bold leading-tight text-[#08285f] transition hover:bg-[#f4f7ff]"
                                                >
                                                    Make a payment
                                                </button>
                                                <div
                                                    x-cloak
                                                    x-show="showPayment"
                                                    x-transition.opacity
                                                    x-on:keydown.escape.window="showPayment = false"
                                                    class="fixed inset-0 z-50 flex items-center justify-center bg-[#031336]/65 p-4 backdrop-blur-sm"
                                                >
                                                    <form
                                                        method="POST"
                                                        action="{{ route('orders.pay', $order) }}"
                                                        x-on:click.outside="showPayment = false"
                                                        class="w-full max-w-md rounded-3xl border border-white/70 bg-white p-5 text-sm text-[#061a42] shadow-2xl"
                                                    >
                                                        @csrf
                                                        @method('PATCH')
                                                        <div class="flex items-start justify-between gap-4">
                                                            <div>
                                                                <p class="text-lg font-extrabold text-[#061a42]">Make a payment</p>
                                                                <p class="mt-1 text-xs font-semibold text-[#5c6a86]">{{ $order->order_number }} / Balance PHP {{ number_format($order->balance, 2) }}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                x-on:click="showPayment = false"
                                                                class="grid h-9 w-9 place-items-center rounded-xl border border-[#c8d3ea] text-lg font-bold text-[#5c6a86] hover:bg-[#f4f7ff]"
                                                                aria-label="Close payment modal"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>

                                                        <div class="mt-5 space-y-4">
                                                            <label class="block">
                                                                <span class="block text-xs font-bold uppercase tracking-[0.12em] text-[#5c6a86]">Amount</span>
                                                                <input
                                                                    type="number"
                                                                    name="amount"
                                                                    step="0.01"
                                                                    min="0.01"
                                                                    max="{{ $order->balance }}"
                                                                    value="{{ number_format($order->balance, 2, '.', '') }}"
                                                                    class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold outline-none focus:border-[#08285f]"
                                                                >
                                                            </label>

                                                            <div>
                                                                <span class="block text-xs font-bold uppercase tracking-[0.12em] text-[#5c6a86]">Payment method</span>
                                                                <div class="mt-2 grid grid-cols-2 gap-3">
                                                                    <label class="cursor-pointer rounded-2xl border border-[#c8d3ea] bg-white p-3 text-center text-sm font-bold text-[#061a42] transition has-[:checked]:border-[#061a42] has-[:checked]:bg-[#eef4ff]">
                                                                        <input type="radio" name="payment_method" value="cash" x-model="paymentMethod" class="sr-only">
                                                                        Cash
                                                                    </label>
                                                                    <label class="cursor-pointer rounded-2xl border border-[#c8d3ea] bg-white p-3 text-center text-sm font-bold text-[#061a42] transition has-[:checked]:border-[#061a42] has-[:checked]:bg-[#eef4ff]">
                                                                        <input type="radio" name="payment_method" value="gcash" x-model="paymentMethod" class="sr-only">
                                                                        GCash
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <label class="block" x-show="paymentMethod === 'gcash'" x-transition>
                                                                <span class="block text-xs font-bold uppercase tracking-[0.12em] text-[#5c6a86]">GCash reference</span>
                                                                <input
                                                                    type="text"
                                                                    name="payment_reference"
                                                                    x-bind:required="paymentMethod === 'gcash'"
                                                                    class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold outline-none focus:border-[#08285f]"
                                                                    placeholder="Reference number"
                                                                >
                                                            </label>
                                                        </div>

                                                        <div class="mt-5 flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                x-on:click="showPayment = false"
                                                                class="rounded-2xl border border-[#c8d3ea] px-4 py-2.5 text-xs font-bold text-[#5c6a86] hover:bg-[#f4f7ff]"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                class="rounded-2xl bg-[#061a42] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#08285f]"
                                                            >
                                                                Confirm payment
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            @endif

                                            @if ($nextStep)
                                                <form method="POST" action="{{ route('orders.advance', $order) }}">
                                                    @csrf
                                                    @method('PATCH')

                                                    @if ($nextStep['key'] === 'fold')
                                                        @php $staffList = $staff ?? \App\Models\User::query()->where('role','staff')->orderBy('name')->get(); @endphp
                                                        <label class="mb-2 block text-sm font-bold text-[#5c6a86]">Assign staff</label>
                                                        <select name="assigned_staff_id" class="mb-3 w-full rounded-2xl border border-[#c8d3ea] bg-white px-2 py-1.5 text-xs font-medium text-[#061a42] outline-none focus:border-[#08285f]">
                                                            <option value="">(unassigned)</option>
                                                            @foreach ($staffList as $st)
                                                                <option value="{{ $st->id }}">{{ $st->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    @endif

                                                    <button type="submit" class="w-full rounded-2xl bg-[#061a42] px-3 py-2.5 text-xs font-bold leading-tight text-white transition hover:bg-[#08285f]">
                                                        {{ $order->actionLabelForStep($nextStep['key']) }}
                                                    </button>
                                                </form>
                                            @else
                                                <span class="inline-flex justify-center rounded-2xl bg-emerald-50 px-3 py-2.5 text-xs font-bold leading-tight text-emerald-700">All done</span>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                                <tr class="border-b border-[#d8e1f5] bg-[#f8fbff]/80">
                                    <td colspan="6" class="px-3 py-4">
                                        <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#5c6a86]">Progress</p>
                                        <x-order-workflow-horizontal :order="$order" />
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
                addons: config.addons,
                serviceId: config.initialServiceId ? Number(config.initialServiceId) : '',
                categoryId: config.initialCategoryId ? Number(config.initialCategoryId) : '',
                weightKg: Number(config.initialWeight) || 1,
                selectedAddons: (config.initialAddons || []).map(id => Number(id)),
                init() {
                    if (!this.serviceId && this.services.length) {
                        this.serviceId = this.services[0].id;
                    }
                    if (!this.categoryId) {
                        this.onServiceChange(false);
                    }
                },
                get selectedService() {
                    return this.services.find(item => item.id === Number(this.serviceId)) || null;
                },
                get selectedCategory() {
                    return this.categories.find(item => item.id === Number(this.categoryId)) || null;
                },
                onServiceChange(resetWeight = true) {
                    const service = this.selectedService;
                    if (!service) return;
                    const category = this.categories.find(c => c.name === service.default_category)
                        || this.categories.find(c => c.name === 'Regular Clothes');
                    if (category) {
                        this.categoryId = category.id;
                    }
                    if (resetWeight && this.selectedCategory) {
                        this.weightKg = Math.min(this.weightKg || 1, this.selectedCategory.max_kg);
                    }
                },
                onCategoryChange(resetWeight = true) {
                    const category = this.selectedCategory;
                    if (!category || !resetWeight) return;
                    if (this.weightKg > category.max_kg) {
                        this.weightKg = category.max_kg;
                    }
                },
                get computed() {
                    const service = this.selectedService || {};
                    const category = this.selectedCategory || {};
                    const allowedKg = Number(category.max_kg || 0);
                    const weight = Number(this.weightKg || 0);
                    const extraKg = allowedKg > 0 ? Math.max(0, weight - allowedKg) : 0;
                    const additionalCharge = extraKg > 0
                        ? Math.ceil(extraKg) * (Number(service.additional_charge || 0) + Number(category.additional_fee || 0))
                        : 0;
                    const servicePrice = Number(service.price_per_kg || 0);
                    const extraServiceAmount = this.addons
                        .filter(addon => this.selectedAddons.map(Number).includes(Number(addon.id)))
                        .reduce((sum, addon) => sum + Number(addon.price || 0), 0);
                    const categoryName = category.name || 'item category';
                    const warning = extraKg > 0
                        ? `Weight exceeds the ${categoryName} load limit of ${allowedKg.toFixed(2)} kg.`
                        : null;

                    return {
                        allowedKg,
                        categoryLabel: category.name
                            ? `Allowed load (${category.name}): ${allowedKg.toFixed(2)} kg`
                            : 'Select an item category to see allowed load',
                        servicePrice,
                        additionalCharge,
                        extraServiceAmount,
                        total: servicePrice + additionalCharge + extraServiceAmount,
                        warning,
                    };
                },
                get indicatorPercent() {
                    return this.computed.allowedKg > 0 ? (Number(this.weightKg || 0) / this.computed.allowedKg) * 100 : 0;
                },
            };
        }
    </script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const customerSelect = document.querySelector('select[name="customer_id"]');
            const customerNameInput = document.querySelector('input[name="customer_name"]');
            const customerPhoneInput = document.querySelector('input[name="customer_phone"]');
            if (!customerSelect || !customerNameInput || !customerPhoneInput) return;

            const fillFromSelectedCustomer = () => {
                const option = customerSelect.selectedOptions?.[0];
                customerNameInput.value = (option?.dataset?.customerName || option?.textContent || '').trim();
                customerPhoneInput.value = (option?.dataset?.customerPhone || '').trim();
                customerNameInput.required = false;
                customerNameInput.dataset.autofilled = 'true';
            };

            customerSelect.addEventListener('change', () => {
                if (!customerSelect.value) {
                    if (customerNameInput.dataset.autofilled === 'true') {
                        customerNameInput.value = '';
                        customerPhoneInput.value = '';
                    }
                    customerNameInput.required = true;
                    customerNameInput.dataset.autofilled = 'false';
                    return;
                }
                fillFromSelectedCustomer();
            });

            if (customerSelect.value) {
                if (!customerNameInput.value && !customerPhoneInput.value) {
                    fillFromSelectedCustomer();
                } else {
                    customerNameInput.required = false;
                    customerNameInput.dataset.autofilled = 'true';
                }
            } else {
                customerNameInput.required = true;
            }
        });
    </script>
</x-app-layout>
