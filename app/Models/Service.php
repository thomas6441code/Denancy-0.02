<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'icon',
        'description',
        'long_description',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    // Accessor for image URL
    public function getImageUrlAttribute()
    {
        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }

    // Method to get featured services (if needed later)
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    // Method to get active services (if needed later)
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
