<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReceiverRequest extends FormRequest
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
        $receiver = $this->route()->receiver;
        return [
            "receiver_name" => [
                'required',
                'string',
                Rule::unique('tbl_receiver','receiver_name')->ignore($receiver->receiver_id,'receiver_id')
            ],
            "receiver_phone" =>[
                'required',
                'string',
                Rule::unique('tbl_receiver','receiver_phone')->ignore($receiver->receiver_id,'receiver_id')
            ],
            "user_id" => [
                'required',
                'string',
                Rule::exists('tbl_user','user_id')
            ],
            "city_id" => [
                'required',
                'string',
                Rule::exists('tbl_city','city_id')
            ],
            "district_id" => [
                'required',
                'string',
                Rule::exists('tbl_district','district_id')
            ],
            "commune_id" => [
                'required',
                'string',
                Rule::exists('tbl_commune','commune_id')
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
            "receiver_name" => 'Tên người nhận',
            "receiver_phone" => 'số điện thoại người nhận',
            "user_id" => 'Người dùng',
            "city_id" => 'Thành phố',
            "district_id" => 'Quận/Huyện',
            "commune_id" => 'Xã',
        ];
    }
}
