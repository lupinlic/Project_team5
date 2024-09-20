<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
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
            "supplier_name" => 'required|string|unique:tbl_supplier,supplier_name',
            "supplier_address" => 'required|string|min:10',
            "supplier_email" => 'required|string|unique:tbl_supplier,supplier_email',
            "supplier_phone" => 'required|string|min:10|unique:tbl_supplier,supplier_phone',
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
            "supplier_name" => 'tên nhà cung cấp',
            "supplier_address" => 'địa chỉ nhà cung cấp',
            "supplier_email" => 'email',
            "supplier_phone" => 'số điện thoại',
        ];
    }
}
