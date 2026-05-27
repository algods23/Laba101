@props(['title' => 'Dashboard'])

<header class="fixed inset-x-0 top-0 z-40 border-b border-white/35 bg-white/80 shadow-[0_18px_48px_rgba(6,26,66,.12)] backdrop-blur-2xl">
    <div class="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#061a42] text-white shadow-lg transition hover:bg-[#08285f] lg:hidden" x-on:click="sidebarOpen = true" aria-label="Open navigation">
            <x-icon name="menu" class="h-6 w-6" />
        </button>

        <button type="button" class="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#c8d3ea] bg-white text-[#061a42] transition hover:border-[#08285f] hover:bg-[#f4f7ff] lg:flex" x-on:click="sidebarCollapsed = ! sidebarCollapsed" aria-label="Collapse navigation">
            <x-icon name="menu" class="h-6 w-6" />
        </button>

        <div class="flex min-w-0 items-center gap-3">
            <img src="{{ asset('laba101-logo.svg') }}" alt="Laba101" class="h-12 w-20 rounded-lg border-2 border-[#061a42] object-cover">
            <div class="hidden sm:block">
                
                <h1 class="truncate text-xl font-extrabold text-[#061a42]">{{ $title }}</h1>
            </div>
        </div>

        <div class="ml-auto flex items-center gap-2 sm:gap-3">
            <div class="hidden rounded-2xl border border-[#c8d3ea] bg-white px-4 py-3 text-sm font-semibold text-[#1d2c50] xl:block">
                {{ now()->format('M d, Y - h:i A') }}
            </div>

            @if(auth()->check() && auth()->user()->role === 'admin')
                <form method="POST" action="{{ route('set.branch') }}" class="hidden items-center gap-2 rounded-2xl border border-[#c8d3ea] bg-white px-3 py-2 text-sm font-semibold text-[#1d2c50] md:flex">
                    @csrf
                    <span class="text-[#5c6a86]">Branch</span>
                    <select name="branch" onchange="this.form.submit()" class="bg-transparent text-[#061a42] outline-none">
                        @foreach(['Main Store', 'Mintal', 'Gensan City'] as $branchOption)
                            <option value="{{ $branchOption }}" {{ session('active_branch', 'Main Store') === $branchOption ? 'selected' : '' }}>{{ $branchOption }}</option>
                        @endforeach
                    </select>
                </form>
            @elseif(auth()->check())
                <div class="hidden items-center gap-2 rounded-2xl border border-[#c8d3ea] bg-white px-3 py-2 text-sm font-semibold text-[#1d2c50] md:flex">
                    <span class="text-[#5c6a86]">Branch</span>
                    <span class="text-[#061a42]">{{ auth()->user()->branch ?? 'Main Store' }}</span>
                </div>
            @endif

            <div class="relative">
                <button type="button" class="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c8d3ea] bg-white text-[#061a42] transition hover:-translate-y-0.5 hover:border-[#08285f] hover:shadow-lg" x-on:click="notificationsOpen = ! notificationsOpen" aria-label="Notifications">
                    <x-icon name="bell" class="h-5 w-5" />
                    <span class="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#3b82f6] ring-2 ring-white"></span>
                </button>
                <div x-cloak x-show="notificationsOpen" x-transition x-on:click.outside="notificationsOpen = false" class="absolute right-0 mt-3 w-72 rounded-2xl border border-[#c8d3ea] bg-white p-4 shadow-2xl">
                    <p class="font-bold text-[#061a42]">Notifications</p>
                    <p class="mt-2 text-sm text-[#5c6a86]">3 orders are ready for pickup.</p>
                </div>
            </div>

            <div class="relative">
                <button type="button" class="flex min-h-12 items-center gap-3 rounded-2xl border border-[#c8d3ea] bg-white px-3 py-2 transition hover:-translate-y-0.5 hover:border-[#08285f] hover:shadow-lg" x-on:click="profileOpen = ! profileOpen">
                    <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#061a42] text-sm font-bold text-white">{{ str(auth()->user()->name)->substr(0, 1) }}</span>
                    <span class="hidden text-left md:block">
                        <span class="block text-sm font-bold text-[#061a42]">{{ auth()->user()->name }}</span>
                        <span class="block text-xs font-semibold capitalize text-[#5c6a86]">{{ auth()->user()->role }}</span>
                    </span>
                    <x-icon name="chevron-down" class="hidden h-4 w-4 text-[#5c6a86] md:block" />
                </button>
                <div x-cloak x-show="profileOpen" x-transition x-on:click.outside="profileOpen = false" class="absolute right-0 mt-3 w-64 rounded-2xl border border-[#c8d3ea] bg-white p-3 shadow-2xl">
                    <div class="rounded-xl bg-[#f4f7ff] p-3">
                        <p class="text-sm font-bold text-[#061a42]">{{ auth()->user()->name }}</p>
                        <p class="text-xs text-[#5c6a86]">{{ auth()->user()->email }}</p>
                    </div>
                    <form method="POST" action="{{ route('logout') }}" class="mt-3">
                        @csrf
                        <button class="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#061a42] px-4 text-sm font-bold text-white transition hover:bg-[#08285f]" type="submit">
                            <x-icon name="logout" class="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
