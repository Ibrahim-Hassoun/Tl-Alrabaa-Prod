<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
        UserSeeder::class,
        AddressSeeder::class,
        CategorySeeder::class,
        TagSeeder::class,
        ProductSeeder::class,
        CartItemSeeder::class,
        OrderSeeder::class,
        OrderItemSeeder::class,
    ]);
    }
}
