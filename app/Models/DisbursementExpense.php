<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisbursementExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'disbursement_number',
        'name',
        'expense_date',
        'category',
        'description',
        'amount',
    ];

    protected function casts(): array
    {
        return [
            'expense_date' => 'date',
            'amount' => 'decimal:2',
        ];
    }
}
