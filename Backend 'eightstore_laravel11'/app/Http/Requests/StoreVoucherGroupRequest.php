<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoucherGroupRequest extends FormRequest
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
            "voucherGroup_name" => 'required|string|unique:tbl_voucher_group,voucherGroup_name',
            "voucherGroup_img" => 'required|string|min:5|unique:tbl_voucher_group,voucherGroup_img',
            "voucherGroup_dsc" => 'required|string|min:5',
        ];
    }


    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ":attribute đã tồn tại",
            "min" => ':attribute tối thiểu là :min'
        ];
    }

    public function attributes(){
        return [
            "voucherGroup_name" => 'Ten voucher',
            "voucherGroup_img" => 'Anh voucher',
            "voucherGroup_dsc" => 'Mo ta voucher',
        ];
    }
}
