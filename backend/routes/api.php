<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::prefix('products')->controller(ProductController::class)->group(function () {
    Route::get('/', 'index');                  // List all products
    Route::post('/', 'store');                // Create a new product
    Route::get('/{id}', 'show');         // Get a single product by ID
    Route::put('/{product}', 'update');       // Update a product by ID
    Route::delete('/{id}', [ProductController::class, 'delete']);   // Delete a product by ID
});