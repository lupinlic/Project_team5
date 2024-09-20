<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDistrictRequest extends FormRequest
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
        $district = $this->route()->district;
        return [
            "city_id" => [
                "required",
                "string",
                Rule::exists('tbl_city','city_id')
            ],
            "district_name" => [
                "required",
                "string",
                Rule::unique('tbl_district','district_name')->ignore($district->district_id,'district_id')
            ],
        ];
    }


    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ":attribute đã tồn tại",
            "exists" => ":attribute không tồn tại",
        ];
    }

    public function attributes(){
        return [
            "city_id" => 'id',
            "district_name" => 'tên',
        ];
    }
}
