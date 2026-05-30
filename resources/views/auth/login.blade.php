@php
    $features = [
        'Order Tracking',
        'Daily Reports',
        'Customer Management',
        'Offline POS Ready',
    ];

    $demoAccounts = [
        ['role' => 'Admin', 'email' => 'admin@laba101.test', 'password' => 'password'],
        ['role' => 'Staff', 'email' => 'staff@laba101.test', 'password' => 'password'],
    ];
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Login - Laba101</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700,800" rel="stylesheet" />
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            body {
                font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
            }

            .bubble {
                animation: float-bubble 9s ease-in-out infinite;
            }

            .bubble:nth-child(2) {
                animation-delay: -2s;
                animation-duration: 12s;
            }

            .bubble:nth-child(3) {
                animation-delay: -5s;
                animation-duration: 10s;
            }

            .bubble:nth-child(4) {
                animation-delay: -7s;
                animation-duration: 14s;
            }

            @keyframes float-bubble {
                0%, 100% {
                    transform: translate3d(0, 0, 0) scale(1);
                    opacity: .48;
                }

                50% {
                    transform: translate3d(18px, -34px, 0) scale(1.08);
                    opacity: .85;
                }
            }
        </style>
    </head>
    <body class="min-h-screen bg-[#031336] text-slate-950 antialiased">
        <main class="grid min-h-screen overflow-hidden lg:grid-cols-[1.08fr_.92fr]">
            <!-- Brand / product story panel -->
            <section class="relative isolate flex min-h-[520px] items-center overflow-hidden bg-[#061a42] px-6 py-10 sm:px-10 lg:min-h-screen lg:px-14 xl:px-20">
                <div class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_24%_18%,rgba(70,116,204,.52),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(21,64,136,.62),transparent_34%),linear-gradient(135deg,#08285f_0%,#061a42_45%,#031336_100%)]"></div>
                <div class="absolute inset-0 -z-10 opacity-35" style="background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px); background-size: 54px 54px;"></div>

                <!-- Ambient floating bubbles -->
                <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
                    <span class="bubble absolute left-[12%] top-[16%] h-24 w-24 rounded-full border border-white/35 bg-white/10 shadow-[0_0_52px_rgba(255,255,255,.22)] backdrop-blur-sm"></span>
                    <span class="bubble absolute right-[14%] top-[20%] h-14 w-14 rounded-full border border-white/30 bg-white/10 shadow-[0_0_42px_rgba(255,255,255,.18)] backdrop-blur-sm"></span>
                    <span class="bubble absolute bottom-[18%] left-[20%] h-16 w-16 rounded-full border border-white/25 bg-white/10 shadow-[0_0_48px_rgba(255,255,255,.18)] backdrop-blur-sm"></span>
                    <span class="bubble absolute bottom-[26%] right-[20%] h-28 w-28 rounded-full border border-white/20 bg-white/10 shadow-[0_0_60px_rgba(255,255,255,.16)] backdrop-blur-sm"></span>
                </div>

                <div class="mx-auto w-full max-w-2xl">
                    <div class="inline-flex rounded-xl border border-white/35 bg-white p-2 shadow-2xl shadow-black/25">
                        <img src="{{ asset('laba101-logo.svg') }}" alt="Laba101" class="h-28 w-48 rounded-lg object-cover sm:h-32 sm:w-56">
                    </div>

                    <div class="mt-10">
                        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#cfe0ff]">Laundry POS System</p>
                        <h1 class="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl xl:text-6xl">
                            Laundry Operations Made Simple
                        </h1>
                        <p class="mt-5 max-w-xl text-base leading-8 text-[#dce7ff] sm:text-lg">
                            Run counter orders, customer queues, payments, and pickup readiness from one clean tablet-friendly workspace.
                        </p>
                    </div>

                    <div class="mt-9 grid gap-3 sm:grid-cols-2">
                        @foreach ($features as $feature)
                            <div class="group flex items-center gap-3 rounded-lg border border-white/18 bg-white/10 px-4 py-4 text-white shadow-lg shadow-black/10 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15">
                                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#061a42] shadow-[0_0_24px_rgba(255,255,255,.32)]">
                                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.31a1 1 0 0 1-1.42 0L3.29 9.22a1 1 0 1 1 1.42-1.408l4.04 4.075 6.54-6.592a1 1 0 0 1 1.414-.006Z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span class="text-sm font-semibold sm:text-base">{{ $feature }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>

            <!-- Authentication panel -->
            <section class="relative flex min-h-screen items-center justify-center bg-[#f5f8ff] px-5 py-8 sm:px-8 lg:px-10">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(8,40,95,.10),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(6,26,66,.12),transparent_30%)]"></div>

                <article class="relative w-full max-w-[420px] rounded-3xl border border-white/80 bg-white/78 p-6 shadow-[0_24px_70px_rgba(6,26,66,.22)] backdrop-blur-2xl sm:p-8">
                    <header class="text-center">
                        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#061a42] p-2 shadow-[0_18px_45px_rgba(6,26,66,.32)]">
                            <img src="{{ asset('laba101-logo.svg') }}" alt="Laba101" class="h-full w-full rounded-xl object-cover">
                        </div>
                        <h2 class="mt-6 text-2xl font-bold text-[#061a42]">Welcome back</h2>
                        <p class="mt-2 text-sm leading-6 text-[#5c6a86]">Sign in to continue managing today’s laundry operations.</p>
                    </header>

                    @if ($errors->any())
                        <div class="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {{ $errors->first() }}
                        </div>
                    @endif

                    <form id="login-form" method="POST" action="{{ route('login.store') }}" class="mt-7 space-y-5">
                        @csrf

                        <div>
                            <label class="block text-sm font-semibold text-[#1d2c50]" for="email">Email address</label>
                            <input id="email" name="email" type="email" value="{{ old('email') }}" autocomplete="email" class="mt-2 h-14 w-full rounded-2xl border border-[#c8d3ea] bg-white/90 px-4 text-base text-[#061a42] outline-none transition duration-200 placeholder:text-[#91a0bd] hover:border-[#8da4d6] focus:border-[#08285f] focus:ring-4 focus:ring-[#08285f]/10" placeholder="admin@laba101.test" required autofocus>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-[#1d2c50]" for="password">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" class="mt-2 h-14 w-full rounded-2xl border border-[#c8d3ea] bg-white/90 px-4 text-base text-[#061a42] outline-none transition duration-200 placeholder:text-[#91a0bd] hover:border-[#8da4d6] focus:border-[#08285f] focus:ring-4 focus:ring-[#08285f]/10" placeholder="Enter password" required>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                            <label class="flex min-h-11 items-center gap-3 text-sm font-medium text-[#1d2c50]">
                                <input name="remember" type="checkbox" value="1" class="h-5 w-5 rounded-md border-[#aebde0] text-[#061a42] focus:ring-[#08285f]">
                                Remember me
                            </label>
                        </div>

                        <button id="login-button" class="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#061a42] px-5 text-base font-bold text-white shadow-[0_18px_38px_rgba(6,26,66,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#08285f] hover:shadow-[0_22px_48px_rgba(6,26,66,.34)] focus:outline-none focus:ring-4 focus:ring-[#08285f]/20 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0" type="submit">
                            <svg id="login-spinner" class="hidden h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"></path>
                            </svg>
                            <span id="login-button-text">Sign in</span>
                        </button>
                    </form>

                    <aside class="mt-7 rounded-2xl border border-[#d5dff2] bg-[#f8fbff] p-4">
                        <p class="text-sm font-bold text-[#061a42]">Demo accounts</p>
                        <div class="mt-3 space-y-3">
                            @foreach ($demoAccounts as $account)
                                <button type="button" data-demo-email="{{ $account['email'] }}" data-demo-password="{{ $account['password'] }}" class="block w-full rounded-xl bg-white px-4 py-3 text-left text-sm text-[#4b5874] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <p class="font-semibold text-[#061a42]">{{ $account['role'] }}</p>
                                    <p class="mt-1">{{ $account['email'] }}</p>
                                    <p class="mt-1">Password: {{ $account['password'] }}</p>
                                </button>
                            @endforeach
                        </div>
                    </aside>
                </article>
            </section>
        </main>

        <script>
            document.querySelectorAll('[data-demo-email]').forEach((button) => {
                button.addEventListener('click', () => {
                    document.getElementById('email').value = button.dataset.demoEmail;
                    document.getElementById('password').value = button.dataset.demoPassword;
                });
            });

            // Prevents double submits and gives a clear touch-friendly loading response.
            document.getElementById('login-form')?.addEventListener('submit', function () {
                const button = document.getElementById('login-button');
                const spinner = document.getElementById('login-spinner');
                const text = document.getElementById('login-button-text');

                button.disabled = true;
                spinner.classList.remove('hidden');
                text.textContent = 'Signing in...';
            });
        </script>
    </body>
</html>
