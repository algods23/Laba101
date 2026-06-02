<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ScopesToBranch;

class DailySale extends Model
{
    use HasFactory, ScopesToBranch;

    protected $fillable = [
        'sale_number',
        'sale_date',
        'amount',
        'cash_amount',
        'gcash_amount',
        'notes',
        'branch',
        'status',
        'endorsed_to',
    ];

    protected function casts(): array
    {
        return [
            'sale_date' => 'date',
            'amount' => 'decimal:2',
            'cash_amount' => 'decimal:2',
            'gcash_amount' => 'decimal:2',
        ];
    }
}
