<x-app-layout title="Settings">
    <section class="space-y-6">
        <div>
            <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">System controls</p>
            <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Settings</h2>
        </div>
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
