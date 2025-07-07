<?php

namespace App\Providers;

use App\Services\ProductService;
use App\Services\CartService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ProductService::class, function ($app) {
        return new ProductService();
     });
        $this->app->singleton(CartService::class, function ($app) {
        return new CartService();
     });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
