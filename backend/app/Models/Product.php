<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// app/Models/Product.php
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'stock_quantity',
        'description',
        'price',
        'image',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
