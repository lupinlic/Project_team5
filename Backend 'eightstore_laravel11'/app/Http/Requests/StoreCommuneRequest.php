<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommuneRequest extends FormRequest
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
            "city_id" => 'required|string|exists:tbl_city,city_id',
            "district_id" => 'required|string|exists:tbl_district,district_id',

            "commune_name" => 'required|string|unique:tbl_commune,commune_name',
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
            "city_id" => 'id city',
            "district_id" => 'id district',
            "commune_name" => 'tên',
        ];
    }
}
