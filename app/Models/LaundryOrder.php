<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Traits\ScopesToBranch;

class LaundryOrder extends Model
{
    use HasFactory, ScopesToBranch;

    public const STATUSES = [
        'received',
        'washing',
        'drying',
        'ready',
        'claimed',
    ];

    protected $fillable = [
        'order_number',
        'customer_id',
        'service_id',
        'item_category_id',
        'status',
        'workflow_completed',
        'weight_kg',
        'price_per_kg',
        'total_amount',
        'additional_charge',
        'extra_service_amount',
        'extra_services',
        'paid_amount',
        'due_at',
        'notes',
        'branch',
    ];

    protected function casts(): array
    {
        return [
            'weight_kg' => 'decimal:2',
            'price_per_kg' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'additional_charge' => 'decimal:2',
            'extra_service_amount' => 'decimal:2',
            'extra_services' => 'array',
            'paid_amount' => 'decimal:2',
            'due_at' => 'datetime',
            'workflow_completed' => 'array',
        ];
    }

    /**
     * @return array<int, array{key: string, label: string, hint: string|null}>
     */
    public function workflowSteps(): array
    {
        $includes = $this->service?->includes ?? [];
        $steps = [
            ['key' => 'received', 'label' => 'Received', 'hint' => null],
        ];

        if (in_array('Wash', $includes, true)) {
            $steps[] = ['key' => 'wash', 'label' => 'Wash', 'hint' => null];
        }

        $extras = collect($this->extra_services ?? []);
        if ($extras->isNotEmpty()) {
            $steps[] = [
                'key' => 'extras',
                'label' => 'Extra services',
                'hint' => $extras->pluck('name')->join(', '),
            ];
        }

        $needsDry = in_array('Dry', $includes, true)
            || ($this->service?->drying_minutes && $this->service->drying_minutes > 0);

        if ($needsDry) {
            $dryHint = $this->service?->drying_minutes
                ? $this->service->drying_minutes.' mins drying'
                : null;
            $steps[] = ['key' => 'dry', 'label' => 'Dry', 'hint' => $dryHint];
        }

        $steps[] = ['key' => 'ready', 'label' => 'Ready for pickup', 'hint' => null];
        $steps[] = ['key' => 'claimed', 'label' => 'Claimed', 'hint' => null];

        return $steps;
    }

    public function workflowStepKeys(): array
    {
        return collect($this->workflowSteps())->pluck('key')->all();
    }

    public function backfillWorkflowFromStatus(): array
    {
        $keys = $this->workflowStepKeys();
        if ($keys === []) {
            return [];
        }

        $target = match ($this->status) {
            'claimed' => 'claimed',
            'ready' => 'ready',
            'drying' => 'dry',
            'washing' => collect(['extras', 'wash', 'received'])->first(fn ($key) => in_array($key, $keys, true)) ?? 'received',
            default => 'received',
        };

        $index = array_search($target, $keys, true);

        return $index === false ? [$keys[0]] : array_slice($keys, 0, $index + 1);
    }

    public function syncStatusFromWorkflow(array $completed): string
    {
        if (in_array('claimed', $completed, true)) {
            return 'claimed';
        }
        if (in_array('ready', $completed, true)) {
            return 'ready';
        }
        if (in_array('dry', $completed, true)) {
            return 'drying';
        }
        if (in_array('extras', $completed, true) || in_array('wash', $completed, true)) {
            return 'washing';
        }
        if (in_array('received', $completed, true)) {
            return 'received';
        }

        return 'received';
    }

    public static function normalizeWorkflowCompleted(array $stepKeys, array $completed): array
    {
        $completed = array_values(array_intersect($stepKeys, $completed));

        if ($completed === []) {
            return [];
        }

        $lastIndex = -1;
        foreach ($completed as $key) {
            $index = array_search($key, $stepKeys, true);
            if ($index === false || $index !== $lastIndex + 1) {
                break;
            }
            $lastIndex = $index;
        }

        return $lastIndex >= 0 ? array_slice($stepKeys, 0, $lastIndex + 1) : [];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(LaundryService::class, 'service_id');
    }

    public function itemCategory(): BelongsTo
    {
        return $this->belongsTo(ItemCategory::class);
    }

    public function getBalanceAttribute(): float
    {
        return (float) $this->total_amount - (float) $this->paid_amount;
    }
}
