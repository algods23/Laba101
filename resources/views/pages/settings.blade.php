<x-app-layout title="Settings">
    <section class="space-y-6">
        <div>
            <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">System controls</p>
            <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Settings</h2>
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

        {{-- Report Email Configuration --}}
        <article class="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
            <div class="flex items-start gap-4">
                <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#061a42] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <div class="flex-1">
                    <h3 class="text-lg font-extrabold text-[#061a42]">Report Email</h3>
                    <p class="mt-1 text-sm text-[#5c6a86]">Set the email address where exported reports will be sent. When you click "Send to Email" in the Reports page, the report file will be automatically sent to this email.</p>
                </div>
            </div>

            <form method="POST" action="{{ route('settings.update') }}" class="mt-5">
                @csrf
                @method('PATCH')
                <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <label class="flex-1">
                        <span class="text-sm font-bold text-[#5c6a86]">Email address</span>
                        <input type="email" name="report_email" value="{{ old('report_email', $user->report_email) }}" placeholder="admin@laba101.com" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 text-sm font-semibold text-[#061a42] outline-none transition focus:border-[#08285f] focus:ring-2 focus:ring-[#08285f]/20" required>
                    </label>
                    <button type="submit" class="h-12 rounded-2xl bg-[#061a42] px-6 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">
                        Save Email
                    </button>
                </div>

                @if ($user->report_email)
                    <div class="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                        <span class="text-sm font-semibold text-emerald-700">Reports will be sent to: <strong>{{ $user->report_email }}</strong></span>
                    </div>
                @else
                    <div class="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span class="text-sm font-semibold text-amber-700">No report email set. Please enter an email above.</span>
                    </div>
                @endif
            </form>
        </article>

        {{-- Other Settings --}}
        <div class="grid gap-5 xl:grid-cols-2">
            @foreach (['Store information', 'Branch settings', 'Receipt customization', 'Printer setup', 'User management', 'Backup database', 'Restore backup', 'Theme settings', 'System preferences'] as $setting)
                <article class="rounded-3xl bg-white/90 p-5 shadow-lg">
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <h3 class="text-lg font-extrabold text-[#061a42]">{{ $setting }}</h3>
                            <p class="mt-1 text-sm text-[#5c6a86]">Configure {{ strtolower($setting) }} for this branch.</p>
                        </div>
                        <label class="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" class="peer sr-only" checked>
                            <span class="h-8 w-14 rounded-full bg-[#c8d3ea] transition peer-checked:bg-[#061a42]"></span>
                            <span class="absolute left-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6"></span>
                        </label>
                    </div>
                    <div class="mt-4 grid gap-3 sm:grid-cols-2">
                        <input class="h-12 rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Setting value">
                        <button class="rounded-2xl bg-[#061a42] px-5 py-3 font-bold text-white transition hover:bg-[#08285f]">Save</button>
                    </div>
                </article>
            @endforeach
        </div>
    </section>
</x-app-layout>
