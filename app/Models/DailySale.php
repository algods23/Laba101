<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailySale extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_number',
        'sale_date',
        'amount',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'sale_date' => 'date',
            'amount' => 'decimal:2',
        ];
    }
}
