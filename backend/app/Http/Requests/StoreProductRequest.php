<?php

// app/Http/Requests/StoreProductRequest.php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;

class StoreProductRequest extends BaseFormRequest

{
    public function authorize(): bool
    {
        return true; // If you need auth checks, add them later
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|max:2048',
        ];
    }
}
