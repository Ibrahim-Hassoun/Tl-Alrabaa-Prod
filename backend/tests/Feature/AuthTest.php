<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function user_can_register_successfully()
    {
        $response = $this->postJson('/api/register', [
            'first_name' => 'John',
            'last_name'  => 'Doe',
            'email'      => 'john@example.com',
            'password'   => 'secret123',
            'password_confirmation' => 'secret123',
            'phone'      => '1234567890'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'user',
                         'access_token',
                         'token_type',
                         'expires_in'
                     ]
                 ]);
    }

    #[Test]
    public function registration_fails_with_invalid_data()
    {
        $response = $this->postJson('/api/register', [
            'email' => 'invalid-email',
            'password' => '123',
        ]);

        $response->assertStatus(422);
    }

    #[Test]
    public function user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => Hash::make('secret123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'john@example.com',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'access_token',
                         'token_type',
                         'expires_in'
                     ]
                 ]);
    }

    #[Test]
    public function login_fails_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => Hash::make('secret123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'john@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
    }

    #[Test]
    public function user_can_logout_successfully()
    {
        $user = User::factory()->create();
        $token = auth('api')->login($user);

        $response = $this->withHeader('Authorization', "Bearer $token")
                         ->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Logout successful']);
    }

    #[Test]
    public function user_can_refresh_token()
    {
        $user = User::factory()->create();
        $token = auth('api')->login($user);

        $response = $this->withHeader('Authorization', "Bearer $token")
                         ->postJson('/api/refresh');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'access_token',
                         'token_type',
                         'expires_in'
                     ]
                 ]);
    }

    #[Test]
    public function user_can_view_profile()
    {
        $user = User::factory()->create();
        $token = auth('api')->login($user);

        $response = $this->withHeader('Authorization', "Bearer $token")
                         ->getJson('/api/profile');

        $response->assertStatus(200)
                 ->assertJsonFragment(['email' => $user->email]);
    }

    #[Test]
    public function unauthorized_user_cannot_access_profile()
    {
        $response = $this->getJson('/api/profile');
        $response->assertStatus(401);
    }
}
