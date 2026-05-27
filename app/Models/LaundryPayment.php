<?php

namespace App\Models;

use App\Models\Traits\ScopesToBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LaundryPayment extends Model
{
    use HasFactory, ScopesToBranch;

    protected $fillable = [
        'laundry_order_id',
        'amount',
        'payment_method',
        'payment_reference',
        'received_at',
        'branch',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'received_at' => 'datetime',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(LaundryOrder::class, 'laundry_order_id');
    }
}
