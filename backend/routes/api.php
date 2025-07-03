<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/profile', [AuthController::class, 'profile']);
});

Route::prefix('products')->controller(ProductController::class)->group(function () {
    Route::get('/', 'index');                   // List all products
    Route::get('/{id}', 'show');                // Get a single product by ID
    Route::middleware(['auth:api', 'role:admin'])->group(function () {
        Route::post('/', 'store');                // Create a new product
        Route::put('/{product}', 'update');       // Update a product by ID
        Route::delete('/{id}', [ProductController::class, 'delete']);   // Delete a product by ID
    });
   
});


Route::prefix('cart')->middleware('auth:api')->group(function () {
    Route::get('/', [CartController::class, 'index']);
    Route::post('/add', [CartController::class, 'add']);
    Route::delete('/remove/{productId}', [CartController::class, 'remove']);
    Route::delete('/clear', [CartController::class, 'clear']);

    Route::patch('/decrease/{productId}', [CartController::class, 'decrease']);
    Route::put('/update', [CartController::class, 'update']);
    Route::get('/has/{productId}', [CartController::class, 'has']);
    Route::get('/totals', [CartController::class, 'totals']);
});