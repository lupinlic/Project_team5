<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVoucherRequest extends FormRequest
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
        $voucher = $this->route()->voucher;
        return [
            "voucherGroup_id" => [
                'required',
                'string',
                Rule::exists('tbl_voucher_group','voucherGroup_id')
            ],
            "voucher_type" => 'required|string|max:1',
            "voucher_discount" => 'required|string|min:1',
            "voucher_minOrder" => 'required|string|min:1',
            "voucher_maxDiscount" => 'required|string|min:1',
            "voucher_code" => [
                'required',
                'string',
                'min:3',
                Rule::unique('tbl_voucher','voucher_code')->ignore($voucher->voucher_id,'voucher_id')
            ],
            "voucher_quantity" => 'required|string|min:1',
            "voucher_dsc" => 'required|string|min:7',
            "start_date" => 'required|string|min:7',
            "end_date" => 'required|string|min:7',
        ];
    }


    public function messages(){
        return[
            "required" => ':attribute không được để trống',
            "unique" => ":attribute đã tồn tại",
            "min" => ':attribute tối thiểu là :min',
            "max" => ':attribute tối đa là :max',
            "exists" => ":attribute không tồn tại",
        ];
    }

    public function attributes(){
        return [
            "voucherGroup_id" =>        'nhóm voucher',
            "voucher_type" =>           'kiểu giá voucher',
            "voucher_discount" =>       'giảm giá',
            "voucher_minOrder" =>       'đơn hàng tối thiểu',
            "voucher_maxDiscount" =>    'giảm giá tối đa',
            "voucher_code" =>           'mã voucher',
            "voucher_quantity" =>       'số lượng voucher',
            "voucher_dsc" =>            'mô tả voucher',
            "start_date" =>             'ngày bắt đầu voucher',
            "end_date" =>               'ngày kết thúc voucher'
        ];
    }
}
