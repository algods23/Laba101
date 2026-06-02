<x-app-layout title="Revolving Fund">
    <section class="space-y-4 md:space-y-6" x-data="{ endorseModalOpen: false, endorseSaleId: null, endorseSaleDate: '' }">
        <div>
            <h2 class="mt-2 text-2xl md:text-3xl font-extrabold text-[#061a42]">Revolving Fund</h2>
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

        <div class="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3">
            <article class="rounded-2xl md:rounded-3xl bg-[#061a42] p-5 md:p-6 shadow-lg text-white">
                <p class="text-[10px] md:text-sm font-bold text-white/70 uppercase tracking-widest">Revolving Fund Total</p>
                <p class="mt-2 md:mt-3 text-2xl md:text-4xl font-extrabold">PHP {{ number_format((float) $revolvingTotal, 2) }}</p>
            </article>
        </div>

        <article class="rounded-2xl md:rounded-3xl bg-white/90 p-4 md:p-5 shadow-lg">
            <h3 class="text-base md:text-lg font-extrabold text-[#061a42]">Daily Summary</h3>
            <div class="mt-4 md:mt-5 overflow-x-auto">
                <table class="w-full text-left text-[11px] md:text-xs xl:text-sm">
                    <thead class="bg-[#061a42] text-white">
                        <tr>
                            <th class="px-3 py-3 font-bold rounded-tl-lg">Date of Sales</th>
                            <th class="px-3 py-3 text-right font-bold">Cash-on Hand</th>
                            <th class="px-3 py-3 text-center font-bold">Status</th>
                            <th class="px-3 py-3 text-center font-bold rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#d8e1f5]">
                        @forelse ($dailySales as $sale)
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-3 py-4 font-bold text-[#061a42] whitespace-nowrap">{{ $sale->sale_date->format('M d, Y') }}</td>
                                <td class="px-3 py-4 text-right font-bold text-green-700 whitespace-nowrap">PHP {{ number_format((float) $sale->cash_amount, 2) }}</td>
                                <td class="px-3 py-4 text-center whitespace-nowrap">
                                    @if($sale->status === 'revolving')
                                        <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">Revolving</span>
                                    @elseif($sale->status === 'endorsed')
                                        <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                                            Endorsed to {{ $sale->endorsed_to }}
                                        </span>
                                    @else
                                        <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">Pending</span>
                                    @endif
                                </td>
                                <td class="px-3 py-4 text-center whitespace-nowrap">
                                    <div class="flex justify-center gap-2">
                                        <form method="POST" action="{{ route('revolving-fund.update-status', $sale) }}">
                                            @csrf
                                            @method('PATCH')
                                            <input type="hidden" name="status" value="revolving">
                                            <button type="submit" class="rounded-lg bg-[#061a42] px-3 py-1.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50" @if($sale->status === 'revolving') disabled @endif>
                                                Revolving
                                            </button>
                                        </form>
                                        <button type="button" class="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50" @click="endorseModalOpen = true; endorseSaleId = '{{ $sale->id }}'; endorseSaleDate = '{{ $sale->sale_date->format('M d, Y') }}'" @if($sale->status === 'endorsed') disabled @endif>
                                            Endorsed
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="4" class="px-3 py-8 text-center text-[#5c6a86]">No daily sales totals yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </article>

        <!-- Endorsed Modal -->
        <div x-cloak x-show="endorseModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-[#031336]/60 backdrop-blur-sm transition-opacity" x-show="endorseModalOpen" x-transition.opacity @click="endorseModalOpen = false"></div>
            
            <div class="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all" x-show="endorseModalOpen" x-transition.scale.origin.bottom>
                <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#061a42] text-white">
                    <h3 class="text-lg font-bold">Endorse Money</h3>
                    <button type="button" @click="endorseModalOpen = false" class="text-white/70 hover:text-white transition">
                        <x-icon name="x" class="h-5 w-5" />
                    </button>
                </div>
                
                <form :action="`{{ url('/revolving-fund') }}/${endorseSaleId}/status`" method="POST" class="p-6">
                    @csrf
                    @method('PATCH')
                    <input type="hidden" name="status" value="endorsed">
                    
                    <p class="text-sm font-semibold text-[#5c6a86] mb-4">Endorsing cash from <span x-text="endorseSaleDate" class="text-[#061a42]"></span>.</p>
                    
                    <label class="block mb-6">
                        <span class="text-sm font-bold text-[#061a42]">Endorsed to (Name)</span>
                        <input type="text" name="endorsed_to" class="mt-2 w-full rounded-xl border border-[#c8d3ea] bg-white px-4 py-3 text-sm font-semibold text-[#061a42] outline-none focus:border-[#061a42] focus:ring-1 focus:ring-[#061a42]" placeholder="Enter name" required>
                    </label>
                    
                    <div class="flex gap-3 justify-end">
                        <button type="button" @click="endorseModalOpen = false" class="rounded-xl px-5 py-3 text-sm font-bold text-[#5c6a86] hover:bg-gray-100 transition">Cancel</button>
                        <button type="submit" class="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition">Submit Endorsement</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</x-app-layout>
