<x-app-layout title="Export Reports">
    <section class="space-y-6">
        <div>
            <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">Exports</p>
            <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Report Center</h2>
        </div>

        @if ($errors->any())
            <div class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {{ $errors->first() }}
            </div>
        @endif

        <form method="GET" action="{{ route('reports.export') }}" class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg" data-report-export-form>
            <div class="grid gap-6 xl:grid-cols-[1fr_420px]">
                <div class="space-y-5">
                    <div>
                        <h3 class="text-lg font-extrabold text-[#061a42]">Date to export</h3>
                        <div class="mt-4 grid gap-3 sm:grid-cols-4">
                            @foreach ($dateScopes as $value => $label)
                                <label class="flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border border-[#c8d3ea] bg-[#f8fbff] px-4 text-sm font-bold text-[#061a42] transition has-[:checked]:border-[#061a42] has-[:checked]:bg-[#061a42] has-[:checked]:text-white">
                                    <input type="radio" name="date_scope" value="{{ $value }}" class="sr-only" data-date-scope @checked(old('date_scope', 'today') === $value)>
                                    {{ $label }}
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <label class="block">
                            <span class="text-sm font-bold text-[#5c6a86]">From</span>
                            <input type="date" name="date_from" value="{{ old('date_from', $defaultDateFrom) }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" data-date-from>
                        </label>
                        <label class="block">
                            <span class="text-sm font-bold text-[#5c6a86]">To</span>
                            <input type="date" name="date_to" value="{{ old('date_to', $defaultDateTo) }}" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none focus:border-[#08285f]" data-date-to>
                        </label>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="text-lg font-extrabold text-[#061a42]">Reports to include</h3>
                    <label class="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#c8d3ea] bg-[#f8fbff] p-4 text-sm font-bold text-[#061a42] transition has-[:checked]:border-[#061a42] has-[:checked]:bg-[#eef4ff]">
                        <input type="checkbox" name="report_types[]" value="sales" class="h-5 w-5 rounded border-[#c8d3ea] text-[#061a42]" @checked(in_array('sales', old('report_types', ['sales', 'disbursement', 'summary']), true))>
                        Sales reports
                    </label>
                    <label class="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#c8d3ea] bg-[#f8fbff] p-4 text-sm font-bold text-[#061a42] transition has-[:checked]:border-[#061a42] has-[:checked]:bg-[#eef4ff]">
                        <input type="checkbox" name="report_types[]" value="disbursement" class="h-5 w-5 rounded border-[#c8d3ea] text-[#061a42]" @checked(in_array('disbursement', old('report_types', ['sales', 'disbursement', 'summary']), true))>
                        Disbursement reports
                    </label>
                    <label class="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#c8d3ea] bg-[#f8fbff] p-4 text-sm font-bold text-[#061a42] transition has-[:checked]:border-[#061a42] has-[:checked]:bg-[#eef4ff]">
                        <input type="checkbox" name="report_types[]" value="summary" class="h-5 w-5 rounded border-[#c8d3ea] text-[#061a42]" @checked(in_array('summary', old('report_types', ['sales', 'disbursement', 'summary']), true))>
                        Summary
                    </label>
                </div>
            </div>

            <div class="mt-6 flex flex-col gap-3 border-t border-[#d8e1f5] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-sm font-semibold text-[#5c6a86]">Summary computes sales minus disbursement for the selected dates.</p>
                <button class="rounded-2xl bg-[#061a42] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">
                    Export Excel
                </button>
            </div>
        </form>
    </section>

    <script>
        window.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector('[data-report-export-form]');
            if (!form) return;

            const ranges = @json($dateRanges);
            const fromInput = form.querySelector('[data-date-from]');
            const toInput = form.querySelector('[data-date-to]');

            form.querySelectorAll('[data-date-scope]').forEach((scopeInput) => {
                scopeInput.addEventListener('change', () => {
                    const selectedRange = ranges[scopeInput.value];
                    if (!selectedRange || !scopeInput.checked) return;

                    fromInput.value = selectedRange.from;
                    toInput.value = selectedRange.to;
                });
            });
        });
    </script>
</x-app-layout>
