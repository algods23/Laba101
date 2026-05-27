<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;

trait ScopesToBranch
{
    protected static function bootScopesToBranch()
    {
        static::addGlobalScope('branch', function (Builder $builder) {
            if (auth()->check()) {
                $user = auth()->user();
                if ($user->role === 'staff') {
                    $builder->where('branch', $user->branch);
                } elseif ($user->role === 'admin') {
                    $builder->where('branch', session('active_branch', 'Main Store'));
                }
            }
        });

        static::creating(function ($model) {
            if (empty($model->branch) && auth()->check()) {
                $user = auth()->user();
                $model->branch = $user->role === 'staff' ? $user->branch : session('active_branch', 'Main Store');
            }
        });
    }
}
