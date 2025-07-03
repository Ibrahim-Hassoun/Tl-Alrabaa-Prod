<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'api'); // if using Laravel Sanctum or session guard

        // If using JWT, generate token:
        // $this->token = auth()->login($this->user);
    }

    public function test_add_item_to_cart()
    {
        $product = Product::factory()->create();

        $response = $this->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity'   => 2,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('cart_items', [
            'user_id'    => $this->user->id,
            'product_id' => $product->id,
            'quantity'   => 2,
        ]);
    }

    public function test_update_cart_item()
    {
        $product = Product::factory()->create();

        // First, add item
        $this->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        // Then, update quantity
        $response = $this->patchJson('/api/cart/update', [
            'product_id' => $product->id,
            'quantity' => 5,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 5,
        ]);
    }

    public function test_list_cart_items()
    {
        $product = Product::factory()->create();

        CartItem::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $product->id,
            'quantity' => 3,
        ]);

        $response = $this->getJson('/api/cart');

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'product_id' => $product->id,
                     'quantity' => 3,
                 ]);
    }

    public function test_remove_item_from_cart()
    {
        $product = Product::factory()->create();

        $this->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response = $this->deleteJson('/api/cart/remove', [
            'product_id' => $product->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('cart_items', [
            'user_id' => $this->user->id,
            'product_id' => $product->id,
        ]);
    }
}
