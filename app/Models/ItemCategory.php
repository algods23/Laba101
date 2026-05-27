<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ItemCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'max_kg',
        'additional_fee',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'max_kg' => 'decimal:2',
            'additional_fee' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(LaundryOrder::class);
    }
}
