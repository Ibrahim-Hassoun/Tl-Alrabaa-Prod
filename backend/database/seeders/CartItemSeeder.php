<?php

namespace Database\Seeders;

use App\Models\CartItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $users = User::pluck('id')->toArray();
    $products = Product::pluck('id')->toArray();
    $existingPairs = [];

    $count = 100; // how many cart items you want

    while (count($existingPairs) < $count) {
        $userId = $users[array_rand($users)];
        $productId = $products[array_rand($products)];
        $key = "$userId-$productId";

        if (!isset($existingPairs[$key])) {
            $existingPairs[$key] = true;

            CartItem::factory()->create([
                'user_id' => $userId,
                'product_id' => $productId,
            ]);
        }
    }
}
}
