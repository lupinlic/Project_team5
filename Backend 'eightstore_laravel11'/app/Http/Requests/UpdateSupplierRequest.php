<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupplierRequest extends FormRequest
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
        $supplier = $this->route()->supplier;
        return [
            "supplier_name" => [
                "required",
                "string",
                Rule::unique('tbl_supplier','supplier_name')->ignore($supplier->supplier_id,'supplier_id')
            ],
            "supplier_address" => 'required|string|min:10',
            "supplier_email" => [
                "required",
                "string",
                Rule::unique('tbl_supplier','supplier_email')->ignore($supplier->supplier_id,'supplier_id')
            ],
            "supplier_phone" => [
                'required',
                'string',
                'min:10',
                Rule::unique('tbl_supplier','supplier_phone')->ignore($supplier->supplier_id,'supplier_id')
            ],
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ':attribute đã tồn tại rồi',
            "min" => ':attribute tối thiểu là :min'
        ];
    }

    public function attributes(){
        return [
            "supplier_name" => 'tên nhà cung cấp',
            "supplier_address" => 'địa chỉ nhà cung cấp',
            "supplier_email" => 'email',
            "supplier_phone" => 'số điện thoại',
        ];
    }
}
