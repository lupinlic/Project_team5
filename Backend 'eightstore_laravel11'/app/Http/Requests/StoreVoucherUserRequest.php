<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoucherUserRequest extends FormRequest
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
            "user_id" => 'required|string|exists:tbl_user,user_id',
            "voucher_id" => 'required|string|exists:tbl_voucher,voucher_id',
            "voucherUser_status" => 'required|string',
            "voucherUser_date" => 'required|string|min:7',
        ];
    }

    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "exists" => ":attribute khong tồn tại",
        ];
    }

    public function attributes(){
        return [
            "user_id" =>            'nguoi dung',
            "voucher_id" =>         'voucher',
            "voucherUser_status" => 'trang thai voucher',
            "voucherUser_date" =>   'ngay sd voucher'
        ];
    }
}
