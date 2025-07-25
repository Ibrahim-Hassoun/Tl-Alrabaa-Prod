<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::inRandomOrder()->first() ?? Product::factory()->create();
        $quantity = $this->faker->numberBetween(1, 4);

         return [
        'order_id' => Order::inRandomOrder()->first()?->id ?? Order::factory(),
        'product_id' => $product->id,
        'quantity' => $quantity,
        'unit_price' => $product->price,
        'total_price' => $quantity * $product->price,
        ];
    }
}
