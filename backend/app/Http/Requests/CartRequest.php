<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;

class CartRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ];
    }
}
