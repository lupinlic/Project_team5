<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
        return [
            "product_name" => 'required|string|unique:tbl_product,product_name',
            "product_img" => 'required|string|unique:tbl_product,product_img',
            "product_price" => 'required|string',
            "product_dsc" => 'required|string',
            "category_id" => 'required|string|exists:tbl_category,category_id',
            "supplier_id" => 'required|string|exists:tbl_supplier,supplier_id',
            "product_quantity" => 'required|string',
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ":attribute đã tồn tại",
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
