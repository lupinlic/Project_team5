<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $product = $this->route()->product;
        return [
            "product_name" => [
                "required",
                "string",
                Rule::unique('tbl_product','product_name')->ignore($product->product_id,'product_id')
            ],
            "product_img" => [
                "required",
                "string",
                Rule::unique('tbl_product','product_img')->ignore($product->product_id,'product_id')
            ],
            "product_price" => 'required|string',
            "product_dsc" => 'required|string',
            "category_id" => 'required|string',
            "supplier_id" => 'required|string',
            "product_quantity" => 'required|string',
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ':attribute đã tồn tại rồi'
        ];
    }

    public function attributes(){
        return [
            "product_name" => 'Tên sản phẩm',
            "product_img" => 'Ảnh sản phẩm',
            "product_price" => 'Giá sản phẩm',
            "product_dsc" => 'Mô tả sản phẩm',
            "category_id" => 'Nhóm sản phẩm',
            "supplier_id" => 'Nhà cung cấp sản phẩm',
            "product_quantity" => 'Số lượng sản phẩm',
        ];
    }
}
