<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVoucherGroupRequest extends FormRequest
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
        $voucherGroup = $this->route()->voucherGroup;
        return [
            "voucherGroup_name" => [
                "required",
                "string",
                Rule::unique('tbl_voucher_group','voucherGroup_name')->ignore($voucherGroup->voucherGroup_id,'voucherGroup_id')
            ],
            "voucherGroup_img" => [
                "required",
                "string",
                'min:5',
                Rule::unique('tbl_voucher_group','voucherGroup_img')->ignore($voucherGroup->voucherGroup_id,'voucherGroup_id')
            ],
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
