<?php
namespace App\Services;

use App\Models\CartItem;

class CartService
{
    public function index($user)
    {
        $cart = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get();

        if(!$cart) {
            throw new \Exception("Cart not found", 404);
        }

        return $cart;
    }

    public function add($user, $data)
    {
        $item = CartItem::withTrashed()
            ->where('user_id', $user->id)
            ->where('product_id', $data['product_id'])
            ->first();

        if ($item) {
            if ($item->trashed()) {
                $item->restore();
            }
            $item->quantity += $data['quantity'];
            $item->save();
        } else {
            $item = CartItem::create([
                'user_id'    => $user->id,
                'product_id' => $data['product_id'],
                'quantity'   => $data['quantity'],
            ]);
        }

        return $item;
    }

    public function remove($user, $productId)
    {
        $item = CartItem::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if (!$item) {
            throw new \Exception("Item not found in cart", 404);
        }

        $item->delete();
        return true;
    }

    public function clear($user)
    {
        CartItem::where('user_id', $user->id)->delete();
    }

    public function decrease($user, $productId)
    {
        $item = CartItem::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if (!$item) {
            throw new \Exception("Item not found in cart", 404);
        }

        if ($item->quantity > 0) {
            $item->decrement('quantity');
            if($item->quantity == 0) {
                $item->delete();
            }
        } else {
            $item->delete();
        }

        return true;
    }

    public function updateQuantity($user, $productId, $qty)
    {
        if ($qty < 1) {
            throw new \Exception("Quantity must be at least 1", 422);
        }

        $item = CartItem::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if (!$item) {
            throw new \Exception("Item not found in cart", 404);
        }

        $item->update(['quantity' => $qty]);
        return $item;
    }

    public function hasItem($user, $productId)
    {
        return CartItem::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->exists();
    }

    public function totals($user)
    {
        $items = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get();

        $totalPrice = 0;
        $totalItems = 0;

        foreach ($items as $item) {
            $totalItems += $item->quantity;
            $totalPrice += $item->quantity * $item->product->price;
        }

        return [
            'items_count' => $totalItems,
            'total_price' => round($totalPrice, 2),
        ];
    }
}
