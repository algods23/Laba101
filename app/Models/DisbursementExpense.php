<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ScopesToBranch;

class DisbursementExpense extends Model
{
    use HasFactory, ScopesToBranch;

    protected $fillable = [
        'disbursement_number',
        'name',
        'expense_date',
        'category',
        'description',
        'amount',
        'branch',
    ];

    protected function casts(): array
    {
        return [
            'expense_date' => 'date',
            'amount' => 'decimal:2',
        ];
    }
}
