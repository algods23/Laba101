<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcleaning extends Model
{
    protected $fillable = ['date', 'cleaning_status', 'notes'];

    protected $casts = [
        'date' => 'date',
    ];

    public function machines(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Machine::class);
    }
}
