<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ScopesToBranch;

class Subcleaning extends Model
{
    use ScopesToBranch;

    protected $fillable = ['date', 'cleaning_status', 'notes', 'branch'];

    protected $casts = [
        'date' => 'date',
    ];

    public function machines(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Machine::class);
    }
}
