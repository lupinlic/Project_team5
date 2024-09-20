<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCartRequest extends FormRequest
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
            "user_id" => 'required|string|exists:tbl_user,user_id',
            "product_id" => 'required|string|exists:tbl_product,product_id',
            "cart_quantity" => 'required|string',
            "cart_totalmoney" => 'required|string',
        ];
    }


    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "exists" => ":attribute không tồn tại",
        ];
    }

    public function attributes(){
        return [
            "user_id" => 'tên user',
            "product_id" => 'product_id',
            "cart_quantity" => 'số lượng',
            "cart_totalmoney" => 'tổng tiền',
        ];
    }
}
