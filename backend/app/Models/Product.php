<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

// app/Models/Product.php
class Product extends Model
{
    use SoftDeletes,HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'price', 'stock_quantity', 'category_id', 'image', 'attributes'
    ];
    protected $casts = [
    'attributes' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
