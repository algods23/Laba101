<x-app-layout title="Pricing Services">
    <section x-data="pricingManager({
        services: @js($services->map(fn ($service) => [
            'id' => $service->id,
            'name' => $service->name,
            'description' => $service->description,
            'category' => $service->category,
            'service_type' => $service->service_type ?? 'order',
            'price_per_kg' => (float) $service->price_per_kg,
            'max_kg' => (float) $service->max_kg,
            'drying_minutes' => $service->drying_minutes,
            'includes' => $service->includes ?: [],
            'additional_charge' => (float) $service->additional_charge,
            'turnaround_hours' => $service->turnaround_hours,
            'is_active' => $service->is_active ? 1 : 0,
        ])->values()),
        categories: @js($itemCategories->map(fn ($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'max_kg' => (float) $category->max_kg,
            'additional_fee' => (float) $category->additional_fee,
            'is_active' => $category->is_active ? 1 : 0,
        ])->values()),
        serviceStoreUrl: '{{ route('pricing.store') }}',
        serviceBaseUrl: '{{ url('/pricing-services') }}',
        categoryStoreUrl: '{{ route('item-categories.store') }}',
        categoryBaseUrl: '{{ url('/item-categories') }}',
    })" class="space-y-6">
        @if (session('status'))
            <div class="rounded-2xl border border-[#9fb4e6] bg-white/80 px-5 py-4 text-sm font-semibold text-[#061a42] shadow-sm backdrop-blur">{{ session('status') }}</div>
        @endif

        @if ($errors->any())
            <div class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                <p class="font-bold">Please check the pricing details.</p>
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">Laundry service management</p>
                <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Pricing Services</h2>
            </div>
            <div class="flex flex-wrap gap-2">
                <button type="button" x-on:click="openCategoryCreate()" class="min-h-12 rounded-2xl border border-[#c8d3ea] bg-white px-5 text-sm font-bold text-[#061a42] transition hover:border-[#08285f]">Add category</button>
                <button type="button" x-on:click="openServiceCreate()" class="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#061a42] px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">
                    <x-icon name="plus" class="h-5 w-5" />
                    Add service
                </button>
            </div>
        </div>

        <article class="rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_48px_rgba(6,26,66,.10)] md:p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 class="text-lg font-extrabold text-[#061a42] md:text-xl">Pricing Services</h3>
                    <p class="mt-1 text-xs text-[#5c6a86] md:text-sm">Main laundry services used on POS orders.</p>
                </div>
            </div>
            <div class="mt-4 overflow-hidden">
                <table class="w-full table-fixed text-left text-[10px] md:text-xs xl:text-sm">
                    <thead class="bg-[#061a42] text-white">
                        <tr>
                            <th class="w-[23%] rounded-l-2xl px-2 py-3 font-bold">Service</th>
                            <th class="w-[14%] px-2 py-3 font-bold">Group</th>
                            <th class="w-[13%] px-2 py-3 text-right font-bold">Price</th>
                            <th class="w-[13%] px-2 py-3 font-bold">Load</th>
                            <th class="w-[12%] px-2 py-3 font-bold">Dry</th>
                            <th class="w-[12%] px-2 py-3 font-bold">Status</th>
                            <th class="w-[13%] rounded-r-2xl px-2 py-3 text-right font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#d8e1f5]">
                        @foreach ($services->where('service_type', 'order') as $service)
                            <tr>
                                <td class="break-words px-2 py-3">
                                    <p class="font-extrabold text-[#061a42]">{{ $service->name }}</p>
                                    @if ($service->includes)
                                        <p class="mt-1 text-[10px] leading-tight text-[#5c6a86]">Includes: {{ implode(', ', $service->includes) }}</p>
                                    @endif
                                </td>
                                <td class="break-words px-2 py-3 font-semibold text-[#5c6a86]">{{ $service->category }}</td>
                                <td class="break-words px-2 py-3 text-right font-extrabold text-[#061a42]">PHP {{ number_format($service->price_per_kg, 2) }}</td>
                                <td class="break-words px-2 py-3">{{ number_format($service->max_kg, 2) }} kg</td>
                                <td class="break-words px-2 py-3">{{ $service->drying_minutes ? $service->drying_minutes.' mins' : 'N/A' }}</td>
                                <td class="px-2 py-3">
                                    <span class="inline-flex rounded-full px-2 py-1 text-[10px] font-bold {{ $service->is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600' }}">{{ $service->is_active ? 'Active' : 'Inactive' }}</span>
                                </td>
                                <td class="px-2 py-3 text-right">
                                    <button type="button" x-on:click="openServiceEdit({{ $service->id }})" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-[10px] font-bold text-[#061a42] transition hover:border-[#08285f] md:text-xs">Edit</button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </article>

        @php($addonServices = $services->where('service_type', 'addon'))
        @if ($addonServices->isNotEmpty())
            <article class="rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_48px_rgba(6,26,66,.10)] md:p-5">
                <h3 class="text-lg font-extrabold text-[#061a42] md:text-xl">Extra add-on services</h3>
                <p class="mt-1 text-xs text-[#5c6a86] md:text-sm">Optional extras staff can add on POS orders.</p>
                <div class="mt-4 overflow-hidden">
                    <table class="w-full table-fixed text-left text-[10px] md:text-xs xl:text-sm">
                        <thead class="bg-[#061a42] text-white">
                            <tr>
                                <th class="w-[25%] rounded-l-2xl px-2 py-3 font-bold">Add-on</th>
                                <th class="w-[17%] px-2 py-3 text-right font-bold">Price</th>
                                <th class="w-[31%] px-2 py-3 font-bold">Description</th>
                                <th class="w-[14%] px-2 py-3 font-bold">Status</th>
                                <th class="w-[13%] rounded-r-2xl px-2 py-3 text-right font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#d8e1f5]">
                            @foreach ($addonServices as $addon)
                                <tr>
                                    <td class="break-words px-2 py-3 font-extrabold text-[#061a42]">{{ $addon->name }}</td>
                                    <td class="break-words px-2 py-3 text-right font-extrabold text-[#061a42]">PHP {{ number_format($addon->price_per_kg, 2) }}</td>
                                    <td class="break-words px-2 py-3 text-[#5c6a86]">{{ $addon->description ?: '-' }}</td>
                                    <td class="px-2 py-3">
                                        <span class="inline-flex rounded-full px-2 py-1 text-[10px] font-bold {{ $addon->is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600' }}">{{ $addon->is_active ? 'Active' : 'Inactive' }}</span>
                                    </td>
                                    <td class="px-2 py-3 text-right">
                                        <button type="button" x-on:click="openServiceEdit({{ $addon->id }})" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-[10px] font-bold text-[#061a42] transition hover:border-[#08285f] md:text-xs">Edit</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </article>
        @endif

        <div>
            <article class="rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_48px_rgba(6,26,66,.10)] md:p-5">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <h3 class="text-lg font-extrabold text-[#061a42] md:text-xl">Item categories</h3>
                        <p class="mt-1 text-xs text-[#5c6a86] md:text-sm">Separate load limits for clothes, comforters, blankets, sheets, towels, and curtains.</p>
                    </div>
                </div>
                <div class="mt-4 overflow-hidden">
                    <table class="w-full table-fixed text-left text-[10px] md:text-xs xl:text-sm">
                        <thead class="bg-[#061a42] text-xs uppercase tracking-[0.08em] text-white">
                            <tr>
                                <th class="w-[28%] rounded-l-2xl px-2 py-3">Category</th>
                                <th class="w-[18%] px-2 py-3">Max KG</th>
                                <th class="w-[22%] px-2 py-3">Extra fee / kg</th>
                                <th class="w-[17%] px-2 py-3">Status</th>
                                <th class="w-[15%] rounded-r-2xl px-2 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#d8e1f5]">
                            @foreach ($itemCategories as $category)
                                <tr>
                                    <td class="break-words px-2 py-3 font-bold text-[#061a42]">{{ $category->name }}</td>
                                    <td class="break-words px-2 py-3">{{ number_format($category->max_kg, 2) }} kg</td>
                                    <td class="break-words px-2 py-3">PHP {{ number_format($category->additional_fee, 2) }}</td>
                                    <td class="px-2 py-3">
                                        <span class="inline-flex rounded-full px-2 py-1 text-[10px] font-bold {{ $category->is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600' }}">{{ $category->is_active ? 'Active' : 'Inactive' }}</span>
                                    </td>
                                    <td class="px-2 py-3 text-right">
                                        <button type="button" x-on:click="openCategoryEdit({{ $category->id }})" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-[10px] font-bold text-[#061a42] transition hover:border-[#08285f] md:text-xs">Edit</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </article>

       

        <div x-cloak x-show="serviceModalOpen" x-transition.opacity class="fixed inset-0 z-50 flex items-center justify-center bg-[#031336]/65 p-4 backdrop-blur-sm">
            <form method="POST" x-bind:action="serviceForm.id ? serviceBaseUrl + '/' + serviceForm.id : serviceStoreUrl" class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
                @csrf
                <template x-if="serviceForm.id"><input type="hidden" name="_method" value="PATCH"></template>
                <div class="flex items-start justify-between gap-4">
                    <h3 class="text-xl font-extrabold text-[#061a42]" x-text="serviceForm.id ? 'Edit service' : 'Add service'"></h3>
                    <button type="button" x-on:click="serviceModalOpen = false" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-sm font-bold text-[#061a42]">Close</button>
                </div>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Service name</span>
                        <input name="name" x-model="serviceForm.name" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Service name">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Billing group</span>
                        <select name="category" x-model="serviceForm.category" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none focus:border-[#08285f]">
                            <option>Self Service</option>
                            <option>Drop-Off</option>
                            <option>Full Service</option>
                            <option>Dry Only</option>
                            <option>Comforter</option>
                            <option>Add-on</option>
                        </select>
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">POS usage</span>
                        <select name="service_type" x-model="serviceForm.service_type" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none focus:border-[#08285f]">
                            <option value="order">Main laundry service</option>
                            <option value="addon">Extra add-on (Zonrox, Fabcon)</option>
                        </select>
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Base price</span>
                        <input type="number" step="0.01" min="0" name="price_per_kg" x-model="serviceForm.price_per_kg" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="0.00">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Max KG per load</span>
                        <input type="number" step="0.01" min="0.25" name="max_kg" x-model="serviceForm.max_kg" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="0.00">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Drying minutes</span>
                        <input type="number" min="1" name="drying_minutes" x-model="serviceForm.drying_minutes" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Optional">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Additional charge per extra KG</span>
                        <input type="number" step="0.01" min="0" name="additional_charge" x-model="serviceForm.additional_charge" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="0.00">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Turnaround hours</span>
                        <input type="number" min="1" name="turnaround_hours" x-model="serviceForm.turnaround_hours" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="24">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Status</span>
                        <select name="is_active" x-model="serviceForm.is_active" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none focus:border-[#08285f]">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </label>
                    <div class="sm:col-span-2 grid gap-2 sm:grid-cols-5">
                        <p class="sm:col-span-5 text-sm font-bold text-[#5c6a86]">Includes</p>
                        @foreach (['Wash', 'Dry', 'Fold', 'Detergent', 'Fabcon'] as $include)
                            <label class="flex items-center gap-2 rounded-2xl border border-[#c8d3ea] px-3 py-3 text-sm font-semibold">
                                <input type="checkbox" name="includes[]" value="{{ $include }}" x-bind:checked="serviceForm.includes.includes('{{ $include }}')">
                                {{ $include }}
                            </label>
                        @endforeach
                    </div>
                    <label class="block sm:col-span-2">
                        <span class="text-sm font-bold text-[#5c6a86]">Description</span>
                        <textarea name="description" x-model="serviceForm.description" class="mt-2 min-h-24 w-full rounded-2xl border border-[#c8d3ea] px-4 py-3 outline-none focus:border-[#08285f]" placeholder="Description"></textarea>
                    </label>
                    <input type="hidden" name="rush_fee" value="0">
                    <input type="hidden" name="delivery_fee" value="0">
                </div>
                <button class="mt-6 w-full rounded-2xl bg-[#061a42] px-5 py-4 font-bold text-white">Save service</button>
            </form>
        </div>

        <div x-cloak x-show="categoryModalOpen" x-transition.opacity class="fixed inset-0 z-50 flex items-center justify-center bg-[#031336]/65 p-4 backdrop-blur-sm">
            <form method="POST" x-bind:action="categoryForm.id ? categoryBaseUrl + '/' + categoryForm.id : categoryStoreUrl" class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
                @csrf
                <template x-if="categoryForm.id"><input type="hidden" name="_method" value="PATCH"></template>
                <div class="flex items-start justify-between gap-4">
                    <h3 class="text-xl font-extrabold text-[#061a42]" x-text="categoryForm.id ? 'Edit category' : 'Add category'"></h3>
                    <button type="button" x-on:click="categoryModalOpen = false" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-sm font-bold text-[#061a42]">Close</button>
                </div>
                <div class="mt-6 grid gap-4">
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Category name</span>
                        <input name="name" x-model="categoryForm.name" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Category name">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Max KG</span>
                        <input type="number" step="0.01" min="0.25" name="max_kg" x-model="categoryForm.max_kg" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="0.00">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Additional fee per extra KG</span>
                        <input type="number" step="0.01" min="0" name="additional_fee" x-model="categoryForm.additional_fee" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="0.00">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Status</span>
                        <select name="is_active" x-model="categoryForm.is_active" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none focus:border-[#08285f]">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </label>
                </div>
                <button class="mt-6 w-full rounded-2xl bg-[#061a42] px-5 py-4 font-bold text-white">Save category</button>
            </form>
        </div>
    </section>

    <script>
        function pricingManager(config) {
            return {
                services: config.services,
                categories: config.categories,
                serviceStoreUrl: config.serviceStoreUrl,
                serviceBaseUrl: config.serviceBaseUrl,
                categoryStoreUrl: config.categoryStoreUrl,
                categoryBaseUrl: config.categoryBaseUrl,
                serviceModalOpen: false,
                categoryModalOpen: false,
                serviceForm: {},
                categoryForm: {},
                calculator: { serviceId: config.services[0]?.id, categoryId: config.categories[0]?.id, weight: 1 },
                get activeServices() { return this.services.filter(service => Number(service.is_active) === 1 && service.service_type === 'order'); },
                get activeCategories() { return this.categories.filter(category => Number(category.is_active) === 1); },
                get computed() {
                    const service = this.services.find(item => item.id === Number(this.calculator.serviceId)) || {};
                    const category = this.categories.find(item => item.id === Number(this.calculator.categoryId)) || {};
                    const allowedKg = Number(category.max_kg || 0);
                    const weight = Number(this.calculator.weight || 0);
                    const extraKg = allowedKg > 0 ? Math.max(0, weight - allowedKg) : 0;
                    const additionalCharge = extraKg > 0 ? Math.ceil(extraKg) * (Number(service.additional_charge || 0) + Number(category.additional_fee || 0)) : 0;
                    const servicePrice = Number(service.price_per_kg || 0);
                    const categoryName = category.name || 'item category';
                    return {
                        allowedKg,
                        categoryLabel: category.name ? `Allowed load (${category.name}): ${allowedKg.toFixed(2)} kg` : 'Select category',
                        servicePrice,
                        additionalCharge,
                        total: servicePrice + additionalCharge,
                        warning: extraKg > 0 ? `Weight exceeds the ${categoryName} load limit of ${allowedKg.toFixed(2)} kg.` : null,
                    };
                },
                openServiceCreate() {
                    this.serviceForm = { id: null, name: '', description: '', category: 'Self Service', service_type: 'order', price_per_kg: '', max_kg: 8, drying_minutes: '', includes: [], additional_charge: 0, turnaround_hours: 24, is_active: 1 };
                    this.serviceModalOpen = true;
                },
                openServiceEdit(id) {
                    this.serviceForm = { ...this.services.find(service => service.id === id) };
                    this.serviceModalOpen = true;
                },
                openCategoryCreate() {
                    this.categoryForm = { id: null, name: '', max_kg: 8, additional_fee: 0, is_active: 1 };
                    this.categoryModalOpen = true;
                },
                openCategoryEdit(id) {
                    this.categoryForm = { ...this.categories.find(category => category.id === id) };
                    this.categoryModalOpen = true;
                },
            };
        }
    </script>
</x-app-layout>
