<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Services\CartService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class CartController extends Controller
{
    use ApiResponse;
    protected CartService $cartService;
    public function __construct(CartService $cartService) {
        $this->cartService = $cartService;
    }

    public function index()
    {
        try {
            $user = auth()->user();
            $items = $this->cartService->index($user);
            return $this->success($items);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(),  500);
        }
    }

    public function add(CartRequest $request)
    {
        try {
            $user = auth()->user();
            $item = $this->cartService->add($user, $request->validated());
            return $this->success($item, "Item added to cart");
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function remove($productId)
    {
        try {
            $user = auth()->user();
            $this->cartService->remove($user, $productId);
            return $this->success(null, "Item removed from cart");
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function clear()
    {
        try {
            $user = auth()->user();
            $this->cartService->clear($user);
            return $this->success(null, "Cart cleared");
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function decrease($productId)
    {
        try {
            $user = auth()->user();
            $this->cartService->decrease($user, $productId);
            return $this->success(null, "Quantity decreased");
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function update(UpdateCartRequest $request)
    {
        try {
            $user = auth()->user();
            $item = $this->cartService->updateQuantity($user, $request->product_id, $request->quantity);
            return $this->success($item, "Quantity updated");
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function has($productId)
    {
        try {
            $user = auth()->user();
            $exists = $this->cartService->hasItem($user, $productId);
            return $this->success(['exists' => $exists]);
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function totals()
    {
        try {
            $user = auth()->user();
            $totals = $this->cartService->totals($user);
            return $this->success($totals);
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
