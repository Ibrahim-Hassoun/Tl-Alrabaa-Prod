<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       return [
        'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
        'address_id' => Address::inRandomOrder()->first()?->id ?? Address::factory(),
        'status' => 'pending',
        'total_price' => $this->faker->randomFloat(2, 30, 300),
        'payment_method' => $this->faker->randomElement(['cod', 'card']),
        'payment_status' => 'unpaid',
        ];
    }
}
