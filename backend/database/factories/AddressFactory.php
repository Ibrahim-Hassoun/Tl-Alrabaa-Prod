<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
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
        'country' => 'Lebanon',
        'city' => $this->faker->city(),
        'state' => $this->faker->state(),
        'street' => $this->faker->streetAddress(),
        'building' => $this->faker->buildingNumber(),
        'apartment' => $this->faker->optional()->randomDigitNotNull(),
        'postal_code' => $this->faker->postcode(),
        'is_default' => $this->faker->boolean(40),
    ];
    }
}
