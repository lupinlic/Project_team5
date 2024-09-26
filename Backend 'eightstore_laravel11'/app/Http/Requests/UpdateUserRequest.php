<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        $user = $this->route()->user;

        return [
            "user_name" => [
                "required",
                "string",
                Rule::unique('tbl_user','user_name')->ignore($user->user_id,'user_id')
            ],
            "user_password" => 'required|string|min:5',
            "user_email" => [
                "required",
                "string",
                Rule::unique('tbl_user','user_email')->ignore($user->user_id,'user_id')
            ],
            "user_isNew" => 'required|string',
            "user_role" => 'required|string',
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
            "user_name" => 'tên khách hàng',
            "user_password" => 'mật khẩu',
            "user_email" => 'email',
            "user_isNew" => 'là người mới',
            "user_role" => 'quyền hạn',
        ];
    }
}
