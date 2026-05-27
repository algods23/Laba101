@props(['order'])

@php
    $steps = $order->workflowSteps();
    $completed = $order->workflow_completed ?? [];
    $nextStep = $order->nextWorkflowStep();
    $nextKey = $nextStep['key'] ?? null;
@endphp

<div class="w-full overflow-x-auto">
    <div class="inline-flex min-w-max items-start gap-3">
        @foreach ($steps as $index => $step)
            @php
                $done = in_array($step['key'], $completed, true);
                $current = $step['key'] === $nextKey;
            @endphp

            <div class="flex items-start gap-2">
                <div class="@class([
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                    'border-emerald-600 bg-emerald-600 text-white' => $done,
                    'border-[#061a42] bg-[#061a42] text-white ring-4 ring-[#061a42]/15' => $current,
                    'border-[#c8d3ea] bg-white text-transparent' => ! $done && ! $current,
                ])">
                    @if ($done)
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    @endif
                </div>

                <div class="min-w-0">
                    <p @class([
                        'text-[11px] font-extrabold leading-tight',
                        'text-[#061a42]' => $done || $current,
                        'text-[#8a98b5]' => ! $done && ! $current,
                    ])>{{ $step['label'] }}</p>
                    @if ($step['hint'])
                        <p class="mt-0.5 text-[10px] leading-snug text-[#5c6a86]">{{ $step['hint'] }}</p>
                    @endif
                </div>
            </div>

            @if (! $loop->last)
                <div class="pt-0.5 text-[11px] font-extrabold tracking-wide text-[#8a98b5]">
                    —
                </div>
            @endif
        @endforeach
    </div>
</div>
