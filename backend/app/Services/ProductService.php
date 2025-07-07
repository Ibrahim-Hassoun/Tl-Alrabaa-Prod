<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Http\Request;
class ProductService
{
   public function getPaginated($perPage = 10, Request $request)
{
    $query = Product::query();

    foreach ($request->query() as $key => $value) {
        if ($key !== 'per_page' && $value !== null) {
            $query->whereJsonContains("attributes->{$key}", $value);
        }
    }

    $products = $query->paginate($perPage);

  

    return $products;
}

   public function create(array $data)
{
    if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
        // Upload to S3
        $path = $data['image']->store('products', 's3');
        Storage::disk('s3')->setVisibility($path, 'public');
        $data['image'] = Storage::disk('s3')->url($path);
    }

    $data['slug'] = Str::slug($data['name']);

    if (!isset($data['stock_quantity'])) {
        $data['stock_quantity'] = 0;
    }

    // ✅ Add this to decode stringified attributes
    if (isset($data['attributes']) && is_string($data['attributes'])) {
        $decoded = json_decode($data['attributes'], true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON format for attributes', 422);
        }

        $data['attributes'] = $decoded;
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
            // Delete old image from S3 if it exists and is hosted on S3
            if ($product->image && str_contains($product->image, 's3.amazonaws.com')) {
                $s3Path = parse_url($product->image, PHP_URL_PATH);
                $s3Path = ltrim($s3Path, '/');
                Storage::disk('s3')->delete($s3Path);
            }

            // Upload new image to S3
            $path = $data['image']->store('products', 's3');
            Storage::disk('s3')->setVisibility($path, 'public');
            $data['image'] = Storage::disk('s3')->url($path);
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
            throw new Exception("Product not found", 400);
        }

        // Do NOT delete image from S3 since the product is just soft-deleted
        $product->delete();
    }


    public function getById($id)
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            throw new Exception('Product not found');
        }

        return $product;
    }
}
