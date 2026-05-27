<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Machine extends Model
{
    protected $fillable = ['machine_name', 'machine_type', 'status'];

    public function subcleanings(): BelongsToMany
    {
        return $this->belongsToMany(Subcleaning::class);
    }
}
