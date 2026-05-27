<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LaundryOrder extends Model
{
    use HasFactory;

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
        'weight_kg',
        'price_per_kg',
        'total_amount',
        'additional_charge',
        'paid_amount',
        'due_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'weight_kg' => 'decimal:2',
            'price_per_kg' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'additional_charge' => 'decimal:2',
            'paid_amount' => 'decimal:2',
            'due_at' => 'datetime',
        ];
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
