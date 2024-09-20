<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
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
        $category = $this->route()->category;
        return [
            "category_name" => [
                "required",
                "string",
                Rule::unique('tbl_category','category_name')->ignore($category->category_id,'category_id')
            ]
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ':attribute đã tồn tại rồi'
        ];
    }

    public function attributes(){
        return [
            "category_name" => 'Tên',
        ];
    }
}
