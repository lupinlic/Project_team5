<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductVoucherRequest extends FormRequest
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
            "product_id" => [
                'required',
                'string',
                Rule::exists('tbl_product','product_id')
            ],
            "voucher_id" => [
                'required',
                'string',
                Rule::exists('tbl_voucher','voucher_id')
            ],
            "productVoucher_dsc" => 'required|string|min:3',
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "exists" => ":attribute khong tồn tại",
        ];
    }

    public function attributes(){
        return [
            "product_id" =>        'san pham',
            "voucher_id" =>         'voucher',
            "productVoucher_dsc" => 'mo ta voucher',
        ];
    }
}
