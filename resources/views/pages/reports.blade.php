<x-app-layout title="Export Reports">
    <section class="space-y-6">
        <div>
            <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">Exports</p>
            <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Report Center</h2>
        </div>

        @if (session('status'))
            <div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                {{ session('status') }}
            </div>
        @endif

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
                <div class="flex flex-col gap-2 sm:flex-row">
                   <button type="button" id="btn-send-email" class="group flex items-center justify-center gap-2 rounded-2xl border-2 border-[#061a42] px-6 py-3 text-sm font-bold text-[#061a42] shadow transition hover:-translate-y-0.5 hover:bg-[#061a42] hover:text-white disabled:cursor-not-allowed disabled:opacity-50" {{ auth()->user()->report_email ? '' : 'disabled' }} title="{{ auth()->user()->report_email ? 'Send to ' . auth()->user()->report_email : 'Set report email in Settings first' }}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    <span id="btn-email-text">
        
            Send to Email

    </span>
</button>
                    <button type="submit" class="rounded-2xl bg-[#061a42] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">
                        Export Excel
                    </button>
                </div>
            </div>
        </form>

        @if (auth()->user()?->role === 'admin' && auth()->user()->report_email)
            <div class="flex items-center gap-2 rounded-2xl bg-[#f8fbff] px-5 py-3 border border-[#d8e1f5]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#5c6a86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p class="text-sm font-semibold text-[#5c6a86]">Reports will be emailed to: <strong class="text-[#061a42]">{{ auth()->user()->report_email }}</strong> — <a href="{{ route('settings.index') }}" class="text-blue-600 underline hover:text-blue-800">Change in Settings</a></p>
            </div>
        @endif
    </section>

    {{-- Hidden form for sending email --}}
    @if (auth()->user()?->role === 'admin')
        <form method="POST" action="{{ route('reports.email') }}" id="email-report-form" class="hidden">
            @csrf
            <input type="hidden" name="date_scope" id="email-date-scope">
            <input type="hidden" name="date_from" id="email-date-from">
            <input type="hidden" name="date_to" id="email-date-to">
            <div id="email-report-types"></div>
        </form>
    @endif

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

            // Send to Email button handler
            const emailBtn = document.getElementById('btn-send-email');
            const emailForm = document.getElementById('email-report-form');
            if (emailBtn && emailForm) {
                emailBtn.addEventListener('click', () => {
                    // Copy form values to the email form
                    const dateScope = form.querySelector('input[name="date_scope"]:checked');
                    if (!dateScope) {
                        alert('Please select a date range first.');
                        return;
                    }
                    document.getElementById('email-date-scope').value = dateScope.value;
                    document.getElementById('email-date-from').value = fromInput.value;
                    document.getElementById('email-date-to').value = toInput.value;

                    // Copy report types
                    const typesContainer = document.getElementById('email-report-types');
                    typesContainer.innerHTML = '';
                    const checkedTypes = form.querySelectorAll('input[name="report_types[]"]:checked');
                    if (checkedTypes.length === 0) {
                        alert('Please select at least one report type.');
                        return;
                    }
                    checkedTypes.forEach(cb => {
                        const hidden = document.createElement('input');
                        hidden.type = 'hidden';
                        hidden.name = 'report_types[]';
                        hidden.value = cb.value;
                        typesContainer.appendChild(hidden);
                    });

                    // Show loading state
                    emailBtn.disabled = true;
                    document.getElementById('btn-email-text').textContent = 'Sending...';

                    emailForm.submit();
                });
            }
        });
    </script>
</x-app-layout>
