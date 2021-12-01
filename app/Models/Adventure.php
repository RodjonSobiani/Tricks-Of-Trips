<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @method static create(array $all)
 * @method static find($id)
 */
class Adventure extends Model
{
    use HasFactory;

    use Sluggable;

    protected $fillable = [
        'title',
        'content',
        ];

    public function subject(): HasOne
    {
        return $this->hasOne(Subject::class);
    }

    public function author(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(
            Level::class,
            'adventure_levels',
            'adventure_id',
            'level_id'
        );
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }
}
