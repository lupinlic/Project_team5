<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderVoucherRequest extends FormRequest
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
            "order_id" => [
                'required',
                'string',
                Rule::exists('tbl_order','order_id')
            ],
            "voucher_id" => [
                'required',
                'string',
                Rule::exists('tbl_voucher','voucher_id')
            ],
            "orderVoucher_price" => 'required|string',
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
            "order_id" =>        'don hang',
            "voucher_id" =>         'voucher',
            "orderVoucher_price" => 'gia voucher da ap dung',
        ];
    }
}
