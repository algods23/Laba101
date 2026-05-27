<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Traits\ScopesToBranch;

class Machine extends Model
{
    use ScopesToBranch;

    protected $fillable = ['machine_name', 'machine_type', 'status', 'branch'];

    public function subcleanings(): BelongsToMany
    {
        return $this->belongsToMany(Subcleaning::class);
    }
}
