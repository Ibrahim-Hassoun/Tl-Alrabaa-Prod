<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\CartItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'api');

        $this->category = Category::factory()->create();
    }

    public function test_add_item_to_cart()
    {
        $product = Product::factory()->create([
            'category_id' => $this->category->id,
        ]);

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
        $product = Product::factory()->create([
            'category_id' => $this->category->id,
        ]);

        $this->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $response = $this->putJson('/api/cart/update', [
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
        $product = Product::factory()->create([
            'category_id' => $this->category->id,
        ]);

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
        $product = Product::factory()->create([
            'category_id' => $this->category->id,
        ]);

        $this->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response = $this->deleteJson("/api/cart/remove/{$product->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted('cart_items', [
            'user_id' => $this->user->id,
            'product_id' => $product->id,
        ]);
    }
}
