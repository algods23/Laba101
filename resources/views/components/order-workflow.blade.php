@props(['order'])

@php
    $steps = $order->workflowSteps();
    $completed = $order->workflow_completed ?? [];
@endphp

<form
    method="POST"
    action="{{ route('orders.status', $order) }}"
    x-data="orderWorkflow({
        steps: @js($steps),
        completed: @js($completed),
    })"
    x-ref="workflowForm"
    class="min-w-[200px]"
>
    @csrf
    @method('PATCH')

    <template x-for="(step, index) in steps" :key="step.key">
        <div class="relative flex gap-2 pb-3 last:pb-0">
            <div class="flex flex-col items-center">
                <button
                    type="button"
                    x-on:click="toggle(step.key)"
                    x-bind:disabled="!canToggle(step.key)"
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition disabled:cursor-not-allowed disabled:opacity-40"
                    x-bind:class="isDone(step.key)
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : (isNext(step.key) ? 'border-[#061a42] bg-white text-[#061a42] hover:bg-[#f4f7ff]' : 'border-[#c8d3ea] bg-white text-transparent')"
                >
                    <svg x-show="isDone(step.key)" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <div x-show="index < steps.length - 1" class="mt-1 w-0.5 flex-1 min-h-[12px]" x-bind:class="isDone(step.key) ? 'bg-emerald-300' : 'bg-[#d8e1f5]'"></div>
            </div>
            <div class="min-w-0 flex-1 pt-0.5">
                <p class="text-xs font-bold leading-tight text-[#061a42]" x-text="step.label"></p>
                <p x-show="step.hint" class="mt-0.5 text-[10px] leading-snug text-[#5c6a86]" x-text="step.hint"></p>
            </div>
        </div>
    </template>

    <template x-for="key in completed" :key="'input-' + key">
        <input type="hidden" name="workflow_completed[]" x-bind:value="key">
    </template>
</form>
