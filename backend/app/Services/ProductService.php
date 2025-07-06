<?php

// app/Services/ProductService.php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Str;

class ProductService
{
    public function getPaginated($perPage = 10, $filters = [])
    {
        $query = Product::with('category');

        if (!empty($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('name', $filters['category']);
            });
        }

        $products = $query->paginate($perPage);

        if ($products->isEmpty()) {
            throw new Exception('No products found.');
        }

        return $products;
    }


    public function create(array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            $data['image'] = $data['image']->store('products', 'public');
        }
        $data['slug'] = Str::slug($data['name']);
        if(!isset($data['stock_quantity'])) {
            $data['stock_quantity'] = 0; // Default stock quantity if not provided
        }
        $product = Product::create($data);

        if (!$product) {
            throw new Exception('Product creation failed.', 400);
        }

        return $product;
    }

    public function update(Product $product, array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $data['image'] = $data['image']->store('products', 'public');
        }

        $updated = $product->update($data);

        if (!$updated) {
            throw new Exception('Product update failed.');
        }

        return $product->fresh();
    }

    public function delete($id)
{
    $product = Product::find($id);

    if (!$product) {
        throw new Exception("Product not found",400);
    }

    $product->delete();
}

    public function getById($id)
{
    $product = Product::with('category')->find($id);

    if (!$product) {
        throw new \Exception('Product not found');
    }

    return $product;
}
}
