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
        'notes',
        'branch',
    ];

    protected function casts(): array
    {
        return [
            'sale_date' => 'date',
            'amount' => 'decimal:2',
        ];
    }
}
