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

        <div x-show="activeTab === 'cleaning'" x-cloak>
            <div class="grid gap-4 md:gap-6 lg:grid-cols-12">
                <article class="lg:col-span-5 xl:col-span-4 rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 p-4 md:p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                    <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Input subcleaning</h3>
                    <p class="mt-1 text-xs md:text-sm text-[#5c6a86]">Log a new cleaning or maintenance record.</p>

                    <form method="POST" action="{{ route('subcleaning.store') }}" class="mt-4 md:mt-5 space-y-3 md:space-y-4">
                        @csrf
                       
                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Date</span>
                            <input type="date" name="date" value="{{ old('date', now()->toDateString()) }}" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" required>
                        </label>

                        <div class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Select Machines</span>
                            <div class="mt-2 grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto rounded-xl border border-[#c8d3ea] p-3">
                                @foreach($machines as $machine)
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" name="machine_ids[]" value="{{ $machine->id }}" class="rounded text-[#061a42] focus:ring-[#08285f]">
                                        <span class="text-xs font-semibold text-[#1d2c50]">{{ $machine->machine_name }}</span>
                                    </label>
                                @endforeach
                            </div>
                        </div>

                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Cleaning Status</span>
                            <select name="cleaning_status" class="mt-1 md:mt-2 h-10 md:h-12 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" required>
                                <option value="completed">Completed (Available)</option>
                                <option value="in_progress">In Progress (Under Cleaning)</option>
                            </select>
                        </label>

                        <label class="block">
                            <span class="text-xs md:text-sm font-bold text-[#5c6a86]">Additional Notes</span>
                            <textarea name="notes" rows="2" class="mt-1 md:mt-2 w-full rounded-xl md:rounded-2xl border border-[#c8d3ea] bg-white px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" placeholder="Optional">{{ old('notes') }}</textarea>
                        </label>

                        <button class="w-full rounded-xl md:rounded-2xl bg-[#061a42] px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">Save record</button>
                    </form>
                </article>

                <article class="lg:col-span-7 xl:col-span-8 space-y-6">
                    <div class="rounded-2xl md:rounded-3xl border border-white/70 bg-white/90 p-4 md:p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)] backdrop-blur">
                        <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Machine Maintenance History</h3>
                        
                        <div class="mt-4 space-y-4">
                            @foreach ($machines as $machine)
                                @if($machine->subcleanings->isNotEmpty())
                                    <div class="rounded-xl border border-[#c8d3ea] bg-[#f8fbff] p-3 md:p-4">
                                        <div class="flex items-center justify-between mb-2">
                                            <h4 class="font-bold text-[#061a42]">{{ $machine->machine_name }} ({{ ucfirst($machine->machine_type) }})</h4>
                                            <span class="inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white 
                                                @if($machine->status === 'available') bg-green-500
                                                @elseif($machine->status === 'under_cleaning') bg-yellow-500
                                                @else bg-red-500
                                                @endif">
                                                {{ str_replace('_', ' ', $machine->status) }}
                                            </span>
                                        </div>
                                        <div class="overflow-x-auto">
                                            <table class="w-full text-left text-xs">
                                                <thead class="text-[#5c6a86]">
                                                    <tr>
                                                        <th class="py-2 pr-4">Date</th>
                                                        <th class="py-2 pr-4">Status</th>
                                                        <th class="py-2">Notes</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="divide-y divide-[#c8d3ea]/50">
                                                    @foreach ($machine->subcleanings->sortByDesc('date') as $record)
                                                        <tr>
                                                            <td class="py-2 pr-4 font-bold text-[#061a42]">{{ $record->date->format('M d, Y') }}</td>
                                                            <td class="py-2 pr-4 capitalize">{{ str_replace('_', ' ', $record->cleaning_status) }}</td>
                                                            <td class="py-2 text-[#5c6a86]">{{ $record->notes ?: '-' }}</td>
                                                        </tr>
                                                    @endforeach
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>
                </article>
            </div>
        </div>

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
                                            <span class="inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white 
                                                @if($machine->status === 'available') bg-green-500
                                                @elseif($machine->status === 'under_cleaning') bg-yellow-500
                                                @else bg-red-500
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
