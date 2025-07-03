<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
     use ApiResponse;

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        try {
            $user = $this->authService->register($request->all());
            return $this->success($user, 'User registered successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $token = $this->authService->login($request->all());
            return $this->success($token, 'Login successful');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 401);
        }
    }

    public function logout()
    {
        try {
            $this->authService->logout();
            return $this->success(null, 'Logout successful');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function refresh()
    {
        try {
            $token = $this->authService->refresh();
            return $this->success($token, 'Token refreshed successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function profile()
    {
        try {
            $user = $this->authService->profile();
            return $this->success($user, 'User profile fetched');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

}
