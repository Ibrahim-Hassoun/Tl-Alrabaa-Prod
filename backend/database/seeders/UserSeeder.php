<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();

    // Create one admin (optional)
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@tlalrabaa.com',
            'role' => 'admin',
            'password' => bcrypt('admin123'),
        ]);
    }
}
