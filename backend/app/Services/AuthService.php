<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'password'   => $data['password'],
            'phone'      => $data['phone'] ?? null,
            'role'       => 'user',
        ]);
        if(!$user){
            throw new \Exception('User registration failed');
        }
        
       $token = auth('api')->login($user); // ✅ FORCE JWT GUARD

        return [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ];

    }

    public function login(array $data)
    {
        if (! $token = auth('api')->attempt($data)) {
            throw new \Exception('Invalid credentials');
        }

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ];
    }

    public function logout()
    {
        auth()->logout();
    }

    public function refresh()
    {
        $token = auth()->refresh();
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }

    public function profile()
    {
        return auth()->user();
    }

}
