@php
    $items = [
        ['label' => 'Dashboard', 'route' => 'dashboard', 'icon' => 'layout-dashboard'],
        ['label' => 'POS / Orders', 'route' => 'pos.orders', 'icon' => 'shopping-cart'],
        ['label' => 'Customers', 'route' => 'customers.index', 'icon' => 'users'],
        ['label' => 'Pricing Services', 'route' => 'pricing.index', 'icon' => 'tags'],
        ['label' => 'Daily Report', 'route' => 'disbursements.index', 'icon' => 'wallet'],
        ['label' => 'Reports', 'route' => 'reports.index', 'icon' => 'bar-chart'],

        
        ['label' => 'Inventory', 'route' => 'inventory.index', 'icon' => 'boxes'],
        ['label' => 'Staff', 'route' => 'staff.index', 'icon' => 'badge'],
        ['label' => 'Settings', 'route' => 'settings.index', 'icon' => 'settings'],
    ];

    if (auth()->user()?->role === 'staff') {
        $items = collect($items)
            ->whereIn('route', ['disbursements.index', 'reports.index', 'inventory.index', 'pos.orders'])
            ->values()
            ->all();
    }
@endphp

<div x-cloak x-show="sidebarOpen" x-transition.opacity class="fixed inset-0 z-40 bg-[#031336]/60 backdrop-blur-sm lg:hidden" x-on:click="sidebarOpen = false"></div>

<aside class="fixed bottom-0 left-0 top-20 z-50 w-72 border-r border-white/30 bg-[#061a42]/95 p-4 text-white shadow-2xl shadow-[#031336]/30 backdrop-blur-2xl transition-all duration-300 lg:translate-x-0"
    x-bind:class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        sidebarCollapsed ? 'lg:w-24' : 'lg:w-72'
    ]">
    <nav class="flex h-full flex-col gap-2 overflow-y-auto pr-1">
        @foreach ($items as $item)
            @php($active = request()->routeIs($item['route']))
            <a href="{{ route($item['route']) }}" class="group flex min-h-14 items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:shadow-lg {{ $active ? 'bg-white text-[#061a42] shadow-xl shadow-black/15' : 'text-[#dce7ff]' }}" x-on:click="sidebarOpen = false">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl {{ $active ? 'bg-[#061a42] text-white' : 'bg-white/10 text-white group-hover:bg-white/20' }}">
                    <x-icon :name="$item['icon']" class="h-5 w-5" />
                </span>
                <span class="truncate" x-show="! sidebarCollapsed" x-transition>{{ $item['label'] }}</span>
            </a>
        @endforeach
    </nav>
</aside>
