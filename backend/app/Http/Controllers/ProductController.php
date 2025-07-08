<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    use ApiResponse;

    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    // GET /api/products
    public function index(Request $request)
{
    try {
        $perPage = $request->query('per_page', 30);
        $products = $this->productService->getPaginated($perPage, $request);

        return $this->success($products);
    } catch (\Exception $e) {
        return $this->error($e->getMessage(), 500);
    }
}


    // GET /api/products/{id}
    public function show($id)
{
    try {
        $product = $this->productService->getById($id);
        return $this->success($product);
    } catch (\Exception $e) {
         return $this->error($e->getMessage(), $e->getCode()?:400);
    }
}

    // POST /api/products
    public function store(StoreProductRequest $request)
    {
        try {
            $product = $this->productService->create($request->validated());
            return $this->success($product, 201);
        } catch (\Exception $e) {
            $status = $e->getCode();
            if (!is_numeric($status) || $status < 100 || $status > 599) {
                $status = 401; // fallback to a valid HTTP code
            }
            return $this->error($e->getMessage(), $status);
        }
    }

    // PUT /api/products/{product}
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $updated = $this->productService->update($product, $request->validated());
            return $this->success($updated);
        } catch (\Exception $e) {
             return $this->error($e->getMessage(), $e->getCode()?:400);
        }
    }

    // DELETE /api/products/{product}
    public function delete($id)
    {
        try {
            $this->productService->delete($id);
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), $e->getCode()?:400);
        }
    }

}
