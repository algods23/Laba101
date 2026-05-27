<x-app-layout title="Staff">
    <section x-data="staffManager({
        staffMembers: @js($staffMembers->map(fn ($staff) => [
            'id' => $staff->id,
            'name' => $staff->name,
            'email' => $staff->email,
            'branch' => $staff->branch,
        ])->values()),
        currentBranch: '{{ $currentBranch }}',
        storeUrl: '{{ route('staff.store') }}',
        baseUrl: '{{ url('/staff') }}'
    })" class="space-y-6">
        @if (session('status'))
            <div class="rounded-2xl border border-[#9fb4e6] bg-white/80 px-5 py-4 text-sm font-semibold text-[#061a42] shadow-sm backdrop-blur">{{ session('status') }}</div>
        @endif

        @if ($errors->any())
            <div class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                <p class="font-bold">Please check the staff details.</p>
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-sm font-bold uppercase tracking-[0.16em] text-[#5c6a86]">Team management</p>
                <h2 class="mt-2 text-3xl font-extrabold text-[#061a42]">Staff Overview</h2>
            </div>
            
            <div class="flex flex-wrap gap-2">
                <form method="GET" action="{{ route('staff.index') }}" class="flex items-center gap-2">
                    <label class="flex items-center gap-2 rounded-2xl border border-[#c8d3ea] bg-white px-3 py-2 text-sm font-semibold text-[#1d2c50]">
                        <span class="text-[#5c6a86]">Branch View</span>
                        <select name="branch" class="bg-transparent text-[#061a42] outline-none" onchange="this.form.submit()">
                            @foreach ($branches as $branch)
                                <option value="{{ $branch }}" {{ $currentBranch === $branch ? 'selected' : '' }}>{{ $branch }}</option>
                            @endforeach
                        </select>
                    </label>
                </form>
                
                <button type="button" x-on:click="openCreate()" class="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#061a42] px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#08285f]">
                    <x-icon name="plus" class="h-5 w-5" />
                    Add staff
                </button>
            </div>
        </div>

        <article class="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(6,26,66,.10)]">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[680px] text-left text-sm">
                    <thead class="bg-[#061a42] text-xs uppercase tracking-[0.08em] text-white">
                        <tr>
                            <th class="rounded-l-2xl px-5 py-4">Name</th>
                            <th class="px-5 py-4">Email</th>
                            <th class="px-5 py-4">Branch</th>
                            <th class="rounded-r-2xl px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#d8e1f5]">
                        @forelse ($staffMembers as $staff)
                            <tr>
                                <td class="px-5 py-4 font-bold text-[#061a42]">{{ $staff->name }}</td>
                                <td class="px-5 py-4 text-[#5c6a86]">{{ $staff->email }}</td>
                                <td class="px-5 py-4 font-semibold text-[#061a42]">
                                    <span class="rounded-full bg-[#eef3ff] px-3 py-1 text-xs">{{ $staff->branch }}</span>
                                </td>
                                <td class="px-5 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <button type="button" x-on:click="openEdit({{ $staff->id }})" class="rounded-xl border border-[#c8d3ea] px-4 py-2 font-bold text-[#061a42] transition hover:border-[#08285f]">Edit</button>
                                        <form method="POST" action="{{ route('staff.destroy', $staff->id) }}" onsubmit="return confirm('Are you sure you want to delete this staff member?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="rounded-xl border border-red-200 px-4 py-2 font-bold text-red-600 transition hover:bg-red-50">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="px-5 py-10 text-center font-medium text-[#5c6a86]">No staff found for this branch.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </article>

        <div x-cloak x-show="modalOpen" x-transition.opacity class="fixed inset-0 z-50 flex items-center justify-center bg-[#031336]/65 p-4 backdrop-blur-sm">
            <form method="POST" x-bind:action="form.id ? baseUrl + '/' + form.id : storeUrl" class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
                @csrf
                <template x-if="form.id"><input type="hidden" name="_method" value="PATCH"></template>
                <div class="flex items-start justify-between gap-4">
                    <h3 class="text-xl font-extrabold text-[#061a42]" x-text="form.id ? 'Edit staff' : 'Add staff'"></h3>
                    <button type="button" x-on:click="modalOpen = false" class="rounded-xl border border-[#c8d3ea] px-3 py-2 text-sm font-bold text-[#061a42]">Close</button>
                </div>
                
                <div class="mt-6 grid gap-4">
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Name</span>
                        <input name="name" x-model="form.name" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Full name">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Email</span>
                        <input type="email" name="email" x-model="form.email" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Email address">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]" x-text="form.id ? 'Password (leave blank to keep current)' : 'Password'"></span>
                        <input type="password" name="password" x-bind:required="!form.id" class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] px-4 outline-none focus:border-[#08285f]" placeholder="Min 8 characters">
                    </label>
                    <label class="block">
                        <span class="text-sm font-bold text-[#5c6a86]">Branch</span>
                        <select name="branch" x-model="form.branch" required class="mt-2 h-12 w-full rounded-2xl border border-[#c8d3ea] bg-white px-4 outline-none focus:border-[#08285f]">
                            @foreach ($branches as $branch)
                                <option value="{{ $branch }}">{{ $branch }}</option>
                            @endforeach
                        </select>
                    </label>
                </div>
                
                <button class="mt-6 w-full rounded-2xl bg-[#061a42] px-5 py-4 font-bold text-white" x-text="form.id ? 'Save changes' : 'Add staff'"></button>
            </form>
        </div>
    </section>

    <script>
        function staffManager(config) {
            return {
                staffMembers: config.staffMembers,
                currentBranch: config.currentBranch,
                storeUrl: config.storeUrl,
                baseUrl: config.baseUrl,
                modalOpen: false,
                form: {},
                openCreate() {
                    this.form = { id: null, name: '', email: '', branch: this.currentBranch };
                    this.modalOpen = true;
                },
                openEdit(id) {
                    this.form = { ...this.staffMembers.find(staff => staff.id === id) };
                    this.modalOpen = true;
                },
            };
        }
    </script>
</x-app-layout>
