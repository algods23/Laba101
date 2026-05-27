@props(['title' => 'Dashboard'])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ $title }} - Laba101</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700,800" rel="stylesheet" />
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="bg-[#eef3ff] font-sans text-[#0f172a] antialiased" style="font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;">
        <div x-data="{ sidebarOpen: false, sidebarCollapsed: false, profileOpen: false, notificationsOpen: false }" class="min-h-screen">
            <x-top-navbar :title="$title" />
            <x-sidebar />

            <div class="pt-24 transition-all duration-300 lg:pl-72" :class="sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'">
                <main class="mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
                    {{ $slot }}
                </main>
            </div>
        </div>
    </body>
</html>
