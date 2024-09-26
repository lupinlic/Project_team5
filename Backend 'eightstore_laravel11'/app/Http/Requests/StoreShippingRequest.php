<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreShippingRequest extends FormRequest
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
            "shipping_cityName" => 'required|string|min:5',
            "shipping_districtName" => 'required|string|min:5',
            "shipping_communeName" => [
            'required',
            'string',
            'min:5',
            // Custom rule to check if the combination of city, district, and commune is unique
            Rule::unique('tbl_shipping')->where(function ($query) {
                return $query
                    ->where('shipping_cityName', request('shipping_cityName'))
                    ->where('shipping_districtName', request('shipping_districtName'))
                    ->where('shipping_communeName', request('shipping_communeName'));
            }),
            ],
            "shipping_name" => 'required|string|min:4',
            "shipping_price" => 'required|string',
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "min" => ":attribute tối thiểu 5 kí tự",
            "unique" => "Địa chỉ này đã tồn tại",
        ];
    }

    public function attributes(){
        return [
            "shipping_cityName" => 'Tên thành phố',
            "shipping_districtName" => 'Tên quận huyện',
            "shipping_communeName" => 'Tên thị xã',
            "shipping_name" => 'Tên đơn vị vận chuyển',
            "shipping_price" => 'giá vận chuyển',
        ];
    }
}
