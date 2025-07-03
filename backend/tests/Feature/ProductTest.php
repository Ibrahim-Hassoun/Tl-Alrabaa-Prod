<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    protected $adminToken;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();

        // Create category
        $this->category = Category::factory()->create();

        // Create admin user and get token
        $admin = User::factory()->create(['role' => 'admin', 'password' => bcrypt('secret123')]);

        $response = $this->postJson('/api/login', [
            'email' => $admin->email,
            'password' => 'secret123',
        ]);

        $this->adminToken = $response->json('data.access_token');
    }

    #[Test]
    public function it_can_list_products_publicly()
    {
        Product::factory()->count(3)->create(['category_id' => $this->category->id]);

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => ['data'],
                 ]);
    }

    #[Test]
    public function it_can_show_a_single_product()
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => $product->name]);
    }

    #[Test]
    public function it_fails_to_show_non_existing_product()
    {
        $response = $this->getJson('/api/products/999');

        $response->assertStatus(400);
    }

    #[Test]
    public function admin_can_create_a_product()
    {
        $data = [
            'name' => 'Test Product',
            'description' => 'Test description',
            'price' => 19.99,
            'category_id' => $this->category->id,
            'image' => 'fake.jpg' // No UploadedFile needed
        ];

        $response = $this->withToken($this->adminToken)
                         ->postJson('/api/products', $data);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Test Product']);
    }

    #[Test]
    public function create_fails_without_auth()
    {
        $this->withoutExceptionHandling(); // helps see real errors

        $data = [
            'name' => 'Unauthorized Product',
            'price' => 10,
            'category_id' => $this->category->id,
            'image' => 'fake.jpg'
        ];

        $response = $this->postJson('/api/products', $data);

        $response->assertStatus(401); // unauthorized
    }

    #[Test]
    public function admin_can_update_product()
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);

        $updateData = [
            'name' => 'Updated Product',
            'price' => 49.99,
        ];

        $response = $this->withToken($this->adminToken)
                         ->putJson("/api/products/{$product->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Updated Product']);
    }

    #[Test]
    public function admin_can_delete_product()
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);

        $response = $this->withToken($this->adminToken)
                         ->deleteJson("/api/products/{$product->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    #[Test]
    public function delete_fails_for_non_existing_product()
    {
        $response = $this->withToken($this->adminToken)
                         ->deleteJson('/api/products/999');

        $response->assertStatus(400);
    }
}
