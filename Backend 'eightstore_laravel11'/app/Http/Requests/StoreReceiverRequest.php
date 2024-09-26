<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReceiverRequest extends FormRequest
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
            "receiver_name" => 'required|string|unique:tbl_receiver,receiver_name',
            "receiver_phone" => 'required|string|min:10|unique:tbl_receiver,receiver_phone',
            "user_id" => 'required|string|exists:tbl_user,user_id',
            "receiver_city" => 'required|string|min:5',
            "receiver_district" => 'required|string|min:5',
            "receiver_commune" => 'required|string|min:5',
            "receiver_dsc" => 'required|string|min:5',
            "receiver_type" => 'required|string|min:1',
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ":attribute đã tồn tại",
            "exists" => ":attribute không tồn tại",
            "min" => ":attribute tối thiểu 5 kí tự",
        ];
    }

    public function attributes(){
        return [
            "receiver_name" => 'Tên người nhận',
            "receiver_phone" => 'số điện thoại người nhận',
            "user_id" => 'Người dùng',
            "receiver_city" => 'Thành phố',
            "receiver_district" => 'Quận/Huyện',
            "receiver_commune" => 'Xã',
            "receiver_dsc" => 'mô tả',
            "receiver_type" => 'kiểu mặc định',
        ];
    }
}
