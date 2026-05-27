<x-app-layout title="Pricing Services">
    <section x-data="pricingManager({
        services: @js($services->map(fn ($service) => [
            'id' => $service->id,
            'name' => $service->name,
            'description' => $service->description,
            'category' => $service->category,
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

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            @foreach ($services as $service)
                <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)]">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-[0.12em] text-[#5c6a86]">{{ $service->category }}</p>
                            <h3 class="mt-2 text-lg font-extrabold text-[#061a42]">{{ $service->name }}</h3>
                        </div>
                        <span class="rounded-full px-3 py-1 text-xs font-bold {{ $service->is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600' }}">{{ $service->is_active ? 'Active' : 'Inactive' }}</span>
                    </div>
                    <p class="mt-4 text-3xl font-extrabold text-[#061a42]">PHP {{ number_format($service->price_per_kg, 2) }}</p>
                    <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div class="rounded-2xl bg-[#f4f7ff] p-3">
                            <p class="text-xs font-bold uppercase text-[#5c6a86]">Max KG</p>
                            <p class="mt-1 font-extrabold text-[#061a42]">{{ number_format($service->max_kg, 2) }} kg</p>
                        </div>
                        <div class="rounded-2xl bg-[#f4f7ff] p-3">
                            <p class="text-xs font-bold uppercase text-[#5c6a86]">Drying</p>
                            <p class="mt-1 font-extrabold text-[#061a42]">{{ $service->drying_minutes ? $service->drying_minutes.' mins' : 'N/A' }}</p>
                        </div>
                    </div>
                    @if ($service->includes)
                        <p class="mt-4 text-xs font-semibold text-[#5c6a86]">Includes: {{ implode(', ', $service->includes) }}</p>
                    @endif
                    <button type="button" x-on:click="openServiceEdit({{ $service->id }})" class="mt-4 h-11 w-full rounded-2xl border border-[#c8d3ea] text-sm font-bold text-[#061a42] transition hover:border-[#08285f]">Edit</button>
                </article>
            @endforeach
        </div>

        <div class="grid gap-6 xl:grid-cols-[1fr_380px]">
            <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)]">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <h3 class="text-xl font-extrabold text-[#061a42]">Item categories</h3>
                        <p class="mt-1 text-sm text-[#5c6a86]">Separate load limits for clothes, comforters, blankets, sheets, towels, and curtains.</p>
                    </div>
                </div>
                <div class="mt-5 overflow-x-auto">
                    <table class="w-full min-w-[680px] text-left text-sm">
                        <thead class="bg-[#061a42] text-xs uppercase tracking-[0.08em] text-white">
                            <tr>
                                <th class="rounded-l-2xl px-5 py-4">Category</th>
                                <th class="px-5 py-4">Max KG</th>
                                <th class="px-5 py-4">Extra fee / kg</th>
                                <th class="px-5 py-4">Status</th>
                                <th class="rounded-r-2xl px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#d8e1f5]">
                            @foreach ($itemCategories as $category)
                                <tr>
                                    <td class="px-5 py-4 font-bold text-[#061a42]">{{ $category->name }}</td>
                                    <td class="px-5 py-4">{{ number_format($category->max_kg, 2) }} kg</td>
                                    <td class="px-5 py-4">PHP {{ number_format($category->additional_fee, 2) }}</td>
                                    <td class="px-5 py-4">{{ $category->is_active ? 'Active' : 'Inactive' }}</td>
                                    <td class="px-5 py-4 text-right">
                                        <button type="button" x-on:click="openCategoryEdit({{ $category->id }})" class="rounded-xl border border-[#c8d3ea] px-4 py-2 font-bold text-[#061a42] transition hover:border-[#08285f]">Edit</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </article>

            <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)]">
                <h3 class="text-xl font-extrabold text-[#061a42]">Price calculator</h3>
                <div class="mt-5 space-y-4">
                    <select x-model.number="calculator.serviceId" class="h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold outline-none">
                        <template x-for="service in activeServices" :key="service.id"><option :value="service.id" x-text="service.name"></option></template>
                    </select>
                    <select x-model.number="calculator.categoryId" class="h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold outline-none">
                        <template x-for="category in activeCategories" :key="category.id"><option :value="category.id" x-text="category.name"></option></template>
                    </select>
                    <input type="number" step="0.01" min="0.25" x-model.number="calculator.weight" class="h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 text-sm font-semibold outline-none" placeholder="Total weight kg">
                    <div class="rounded-2xl bg-[#f4f7ff] p-4 text-sm">
                        <p class="font-bold text-[#061a42]" x-text="'Allowed load: ' + computed.allowedKg.toFixed(2) + ' kg'"></p>
                        <p class="mt-2 text-[#5c6a86]" x-text="'Service Price: PHP ' + computed.servicePrice.toFixed(2)"></p>
                        <p class="text-[#5c6a86]" x-text="'Additional KG Fee: PHP ' + computed.additionalCharge.toFixed(2)"></p>
                        <p class="mt-3 text-xl font-extrabold text-[#061a42]" x-text="'Total: PHP ' + computed.total.toFixed(2)"></p>
                        <p x-show="computed.warning" class="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Selected items exceed allowed load capacity.</p>
                    </div>
                </div>
            </article>
        </div>

        <div x-cloak x-show="serviceModalOpen" x-transition.opacity class="fixed inset-0 z-50 flex items-center justify-center bg-[#031336]/65 p-4 backdrop-blur-sm">
            <form method="POST" x-bind:action="serviceForm.id ? serviceBaseUrl + '/' + serviceForm.id : serviceStoreUrl" class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
                @csrf
                <template x-if="serviceForm.id"><input type="hidden" name="_method" value="PATCH"></template>
                <div class="flex items-start justify-between gap-4">
                    <h3 class="text-xl font-extrabold text-[#061a42]" x-text="serviceForm.id ? 'Edit service' : 'Add service'"></h3>
                    <button type="button" x-on:click="serviceModalOpen = false" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-sm font-bold text-[#061a42]">Close</button>
                </div>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                    <input name="name" x-model="serviceForm.name" required class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Service name">
                    <select name="category" x-model="serviceForm.category" required class="h-12 rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none">
                        <option>Self Service</option>
                        <option>Drop-Off</option>
                        <option>Full Service</option>
                        <option>Dry Only</option>
                    </select>
                    <input type="number" step="0.01" min="0" name="price_per_kg" x-model="serviceForm.price_per_kg" required class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Base price">
                    <input type="number" step="0.01" min="0.25" name="max_kg" x-model="serviceForm.max_kg" required class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Max KG per load">
                    <input type="number" min="1" name="drying_minutes" x-model="serviceForm.drying_minutes" class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Drying minutes">
                    <input type="number" step="0.01" min="0" name="additional_charge" x-model="serviceForm.additional_charge" class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Additional charge / extra kg">
                    <input type="number" min="1" name="turnaround_hours" x-model="serviceForm.turnaround_hours" required class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Turnaround hours">
                    <select name="is_active" x-model="serviceForm.is_active" class="h-12 rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    <div class="sm:col-span-2 grid gap-2 sm:grid-cols-5">
                        @foreach (['Wash', 'Dry', 'Fold', 'Detergent', 'Fabcon'] as $include)
                            <label class="flex items-center gap-2 rounded-2xl border border-[#c8d3ea] px-3 py-3 text-sm font-semibold">
                                <input type="checkbox" name="includes[]" value="{{ $include }}" x-bind:checked="serviceForm.includes.includes('{{ $include }}')">
                                {{ $include }}
                            </label>
                        @endforeach
                    </div>
                    <textarea name="description" x-model="serviceForm.description" class="min-h-24 rounded-2xl border border-[#c8d3ea] px-4 py-3 outline-none sm:col-span-2" placeholder="Description"></textarea>
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
                    <input name="name" x-model="categoryForm.name" required class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Category name">
                    <input type="number" step="0.01" min="0.25" name="max_kg" x-model="categoryForm.max_kg" required class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Max KG">
                    <input type="number" step="0.01" min="0" name="additional_fee" x-model="categoryForm.additional_fee" class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none" placeholder="Additional fee / extra kg">
                    <select name="is_active" x-model="categoryForm.is_active" class="h-12 rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
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
                get activeServices() { return this.services.filter(service => Number(service.is_active) === 1); },
                get activeCategories() { return this.categories.filter(category => Number(category.is_active) === 1); },
                get computed() {
                    const service = this.services.find(item => item.id === Number(this.calculator.serviceId)) || {};
                    const category = this.categories.find(item => item.id === Number(this.calculator.categoryId)) || {};
                    const allowedKg = Math.min(Number(service.max_kg || 0), Number(category.max_kg || 0));
                    const weight = Number(this.calculator.weight || 0);
                    const extraKg = Math.max(0, weight - allowedKg);
                    const additionalCharge = extraKg > 0 ? Math.ceil(extraKg) * (Number(service.additional_charge || 0) + Number(category.additional_fee || 0)) : 0;
                    const servicePrice = Number(service.price_per_kg || 0);
                    return { allowedKg, servicePrice, additionalCharge, total: servicePrice + additionalCharge, warning: extraKg > 0 };
                },
                openServiceCreate() {
                    this.serviceForm = { id: null, name: '', description: '', category: 'Self Service', price_per_kg: '', max_kg: 8, drying_minutes: '', includes: [], additional_charge: 0, turnaround_hours: 24, is_active: 1 };
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
