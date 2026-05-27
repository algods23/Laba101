<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LaundryService extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'price_per_kg',
        'max_kg',
        'drying_minutes',
        'includes',
        'additional_charge',
        'rush_fee',
        'delivery_fee',
        'turnaround_hours',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price_per_kg' => 'decimal:2',
            'max_kg' => 'decimal:2',
            'drying_minutes' => 'integer',
            'includes' => 'array',
            'additional_charge' => 'decimal:2',
            'rush_fee' => 'decimal:2',
            'delivery_fee' => 'decimal:2',
            'turnaround_hours' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(LaundryOrder::class, 'service_id');
    }
}
