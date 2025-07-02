<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
    $price = $this->faker->randomFloat(2, 5, 50);

    return [
        'name' => ucfirst($name),
        'slug' => Str::slug($name),
        'description' => $this->faker->sentence(10),
        'price' => $price,
        'discount_price' => $this->faker->optional()->randomFloat(2, 2, $price),
        'on_sale' => $this->faker->boolean(30), // 30% chance it's on sale
        'stock_quantity' => $this->faker->numberBetween(10, 100),
        'image' => 'default.jpg',
        'category_id' => Category::inRandomOrder()->first()?->id ?? 1,
        'is_active' => true,
    ];
    }
}
