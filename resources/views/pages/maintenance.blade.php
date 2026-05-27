<x-app-layout title="Maintenance & Cleaning">
    <section class="space-y-4 md:space-y-6" x-data="{ activeTab: 'cleaning' }">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 class="mt-2 text-2xl md:text-3xl font-extrabold text-[#061a42]">Maintenance & Cleaning</h2>
                <p class="mt-1 text-sm text-[#5c6a86]">Manage machine subcleaning and maintenance records.</p>
            </div>
            <div class="flex overflow-x-auto rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white/90 p-1 shadow-lg">
                <button type="button" class="whitespace-nowrap rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 text-xs md:text-sm font-bold transition" :class="activeTab === 'cleaning' ? 'bg-[#061a42] text-white' : 'text-[#061a42]'" @click="activeTab = 'cleaning'">Subcleaning</button>
                <button type="button" class="whitespace-nowrap rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 text-xs md:text-sm font-bold transition" :class="activeTab === 'machines' ? 'bg-[#061a42] text-white' : 'text-[#061a42]'" @click="activeTab = 'machines'">Machine Management</button>
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

        {{-- ═══════════════════════════════════════════════════════════════════
             SUBCLEANING TAB
        ═══════════════════════════════════════════════════════════════════ --}}
        <div x-show="activeTab === 'cleaning'" x-cloak>

            {{-- ── Two-column card: Available ↔ Under Cleaning ── --}}
            @php
                $availableMachines = $machines->where('status', '!=', 'under_cleaning');
                $cleaningMachines  = $machines->where('status', 'under_cleaning');
            @endphp

            <div class="rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur overflow-hidden">
                <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#c8d3ea]/60">

                    {{-- ── LEFT: Available Machines ── --}}
                    <div class="p-4 md:p-6">
                        <div class="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#061a42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                            <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Available Machines</h3>
                        </div>
                        <p class="text-xs text-[#5c6a86] mb-4">Select machines to start cleaning.</p>

                        @if($availableMachines->isNotEmpty())
                            <form method="POST" action="{{ route('subcleaning.store') }}" class="space-y-4">
                                @csrf
                                <input type="hidden" name="date" value="{{ now()->toDateString() }}">
                                <input type="hidden" name="cleaning_status" value="in_progress">

                                <div class="grid grid-cols-1 gap-2 max-h-[320px] overflow-y-auto pr-1">
                                    @foreach($availableMachines as $machine)
                                        <label class="flex items-center gap-3 rounded-xl border border-[#c8d3ea]/70 bg-[#f8fbff] px-3 py-2 cursor-pointer transition hover:border-[#061a42]/40 hover:bg-[#eef3ff]">
                                            <input type="checkbox" name="machine_ids[]" value="{{ $machine->id }}" class="h-4 w-4 rounded border-[#c8d3ea] text-[#061a42] focus:ring-[#08285f]">
                                            <div class="min-w-0 flex-1 flex justify-between items-center">
                                                <div>
                                                    <span class="block text-xs font-bold text-[#061a42] truncate">{{ $machine->machine_name }}</span>
                                                    <span class="block text-[10px] text-[#5c6a86] capitalize">{{ $machine->machine_type }}</span>
                                                </div>
                                                <span class="inline-flex h-2 w-2 shrink-0 rounded-full bg-green-400"></span>
                                            </div>
                                        </label>
                                    @endforeach
                                </div>

                                <label class="block">
                                    <span class="text-xs font-bold text-[#5c6a86]">Notes <span class="font-normal">(optional)</span></span>
                                    <textarea name="notes" rows="2" class="mt-1 w-full rounded-xl border border-[#c8d3ea] bg-white px-3 py-2 text-xs font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="e.g. Deep clean filters">{{ old('notes') }}</textarea>
                                </label>

                                <button class="w-full rounded-xl bg-[#061a42] px-4 py-3 text-xs md:text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">
                                    Start Cleaning
                                </button>
                            </form>
                        @else
                            <div class="flex flex-col items-center justify-center py-10 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#c8d3ea] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>
                                <p class="text-xs font-semibold text-[#5c6a86]">All machines are currently being cleaned.</p>
                            </div>
                        @endif
                    </div>

                    {{-- ── RIGHT: Under Cleaning ── --}}
                    <div class="p-4 md:p-6 bg-[#fffbf5]">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-base">🔄</span>
                            <h3 class="text-base md:text-lg font-extrabold text-[#9b6224]">Under Cleaning</h3>
                            @if($cleaningMachines->isNotEmpty())
                                <span class="ml-auto inline-flex items-center justify-center h-6 min-w-[24px] rounded-full bg-[#9b6224] px-2 text-[10px] font-extrabold text-white">{{ $cleaningMachines->count() }}</span>
                            @endif
                        </div>
                        <p class="text-xs text-[#876643] mb-4">Machines currently being serviced.</p>

                        @if($cleaningMachines->isNotEmpty())
                            <div class="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                                @foreach($cleaningMachines as $machine)
                                    @php
                                        // Grab the latest in_progress subcleaning for this machine to show "time started"
                                        $latestCleaning = $machine->subcleanings->firstWhere('cleaning_status', 'in_progress');
                                    @endphp
                                    <div class="rounded-xl border border-[#f0d0a8] bg-white p-3 shadow-sm flex items-center justify-between gap-3">
                                        <div class="flex items-center gap-3 min-w-0">
                                            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
                                            </div>
                                            <div class="min-w-0">
                                                <p class="text-sm font-extrabold text-[#061a42] truncate">{{ $machine->machine_name }}</p>
                                                <div class="flex items-center gap-2">
                                                    <p class="text-[10px] font-semibold capitalize text-[#5c6a86]">{{ $machine->machine_type }}</p>
                                                    @if($latestCleaning)
                                                        <span class="text-[10px] font-semibold text-[#876643]">&bull; {{ $latestCleaning->created_at->format('h:i A') }}</span>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                        <form method="POST" action="{{ route('machines.complete', $machine) }}" class="shrink-0">
                                            @csrf
                                            @method('PATCH')
                                            <button class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#061a42] px-3 py-2 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#08285f] active:translate-y-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                                Finish
                                            </button>
                                        </form>
                                    </div>
                                @endforeach
                            </div>
                        @else
                            <div class="flex flex-col items-center justify-center py-10 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#f0d0a8] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                <p class="text-xs font-semibold text-[#876643]">No machines under cleaning right now.</p>
                            </div>
                        @endif
                    </div>

                </div>
            </div>

            {{-- ── Machine Maintenance History ── --}}
            <div class="mt-4 md:mt-6">
                @php
                    $filterDate = request('filter_date', now()->toDateString());
                    $formattedDate = \Carbon\Carbon::parse($filterDate)->format('M d, Y');
                @endphp
                <article class="rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 p-4 md:p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                    
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                            <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Daily Cleaning Checklist</h3>
                            <p class="text-xs text-[#5c6a86]">Track which machines have been cleaned on a specific date.</p>
                        </div>
                        <form method="GET" action="{{ route('maintenance.index') }}" class="flex items-center gap-2">
                            <label for="filter_date" class="text-xs font-bold text-[#061a42] shrink-0">Filter Date:</label>
                            <input type="date" name="filter_date" id="filter_date" value="{{ $filterDate }}" class="h-9 rounded-lg border border-[#c8d3ea] px-3 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" onchange="this.form.submit()">
                        </form>
                    </div>

                    <div class="overflow-x-auto rounded-xl border border-[#c8d3ea]">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-[#f8fbff] text-[#5c6a86]">
                                <tr>
                                    <th class="px-3 py-3 md:px-4 font-semibold">Machine</th>
                                    <th class="px-3 py-3 md:px-4 font-semibold">Type</th>
                                    <th class="px-3 py-3 md:px-4 font-semibold">Status ({{ $formattedDate }})</th>
                                    <th class="px-3 py-3 md:px-4 font-semibold">Notes</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#c8d3ea]/50 bg-white">
                                @foreach ($machines as $machine)
                                    @php
                                        // Find the record for the selected date
                                        $record = $machine->subcleanings->first(function ($r) use ($filterDate) {
                                            return $r->date->toDateString() === $filterDate;
                                        });
                                    @endphp
                                    <tr class="hover:bg-[#f8fbff]/50 transition">
                                        <td class="px-3 py-3 md:px-4 font-bold text-[#061a42]">{{ $machine->machine_name }}</td>
                                        <td class="px-3 py-3 md:px-4 text-[#5c6a86] capitalize">{{ $machine->machine_type }}</td>
                                        <td class="px-3 py-3 md:px-4">
                                            @if($record)
                                                <span class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide
                                                    @if($record->cleaning_status === 'completed') bg-green-100 text-green-700
                                                    @else bg-yellow-100 text-yellow-700
                                                    @endif">
                                                    {{ str_replace('_', ' ', $record->cleaning_status) }}
                                                </span>
                                            @else
                                                <span class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-red-50 text-red-500 border border-red-100">
                                                    Not Cleaned
                                                </span>
                                            @endif
                                        </td>
                                        <td class="px-3 py-3 md:px-4 text-[#5c6a86] truncate max-w-[200px]">{{ $record->notes ?? '-' }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </article>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════════
             MACHINE MANAGEMENT TAB
        ═══════════════════════════════════════════════════════════════════ --}}
        <div x-show="activeTab === 'machines'" x-cloak>
            <div class="grid gap-4 md:gap-6 lg:grid-cols-12">
                <article class="lg:col-span-5 xl:col-span-4 rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 p-4 md:p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                    <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Add Machine</h3>

                    <form method="POST" action="{{ route('machines.store') }}" class="mt-4 md:mt-5 space-y-3 md:space-y-4">
                        @csrf
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Machine Name</span>
                            <input name="machine_name" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none" required placeholder="e.g. Washer 5">
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Type</span>
                            <select name="machine_type" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none" required>
                                <option value="washer">Washer</option>
                                <option value="dryer">Dryer</option>
                            </select>
                        </label>
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Status</span>
                            <select name="status" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none" required>
                                <option value="available">Available</option>
                                <option value="under_cleaning">Under Cleaning</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </label>
                        <button class="w-full rounded-xl md:rounded-2xl bg-[#061a42] px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-bold text-white shadow-lg transition">Add machine</button>
                    </form>
                </article>

                <article class="lg:col-span-7 xl:col-span-8 rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 p-4 md:p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                    <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Machines</h3>

                    <div class="mt-4 overflow-x-auto">
                        <table class="w-full min-w-[600px] text-left text-xs md:text-sm">
                            <thead class="bg-[#061a42] text-white">
                                <tr>
                                    <th class="px-3 py-3 md:px-5 md:py-4">Name</th>
                                    <th class="px-3 py-3 md:px-5 md:py-4">Type</th>
                                    <th class="px-3 py-3 md:px-5 md:py-4">Status</th>
                                    <th class="px-3 py-3 md:px-5 md:py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#d8e1f5]">
                                @forelse ($machines as $machine)
                                    <tr>
                                        <td class="px-3 py-3 md:px-5 md:py-4 font-bold text-[#061a42]">{{ $machine->machine_name }}</td>
                                        <td class="px-3 py-3 md:px-5 md:py-4 font-semibold capitalize text-[#1d2c50]">{{ $machine->machine_type }}</td>
                                        <td class="px-3 py-3 md:px-5 md:py-4">
                                            <span class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest
                                                @if($machine->status === 'available') bg-green-100 text-green-700
                                                @elseif($machine->status === 'under_cleaning') bg-yellow-100 text-yellow-700
                                                @else bg-red-100 text-red-700
                                                @endif">
                                                {{ str_replace('_', ' ', $machine->status) }}
                                            </span>
                                        </td>
                                        <td class="px-3 py-3 md:px-5 md:py-4 text-right">
                                            <form method="POST" action="{{ route('machines.destroy', $machine) }}" class="inline-block" onsubmit="return confirm('Delete this machine?')">
                                                @csrf
                                                @method('DELETE')
                                                <button class="text-red-500 hover:underline">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                @empty
                                    <tr><td colspan="4" class="px-3 py-8 text-center text-[#5c6a86]">No machines found.</td></tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </article>
            </div>
        </div>
    </section>
</x-app-layout>
