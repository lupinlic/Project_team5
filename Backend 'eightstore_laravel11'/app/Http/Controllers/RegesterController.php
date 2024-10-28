<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegesterController extends Controller
{
    public function User_Regester(Request $request){
        
        $validatedData = $request->validate([
            "user_name" => 'required|string|unique:tbl_user,user_name',
            "user_password" => 'required|string|min:5',
            "user_email" => 'required|string|unique:tbl_user,user_email',
        ],
        [
            "required" => ':attribute không được để trống',
            "unique" => ":attribute đã tồn tại",
            "min" => ':attribute tối thiểu là :min'
        ],
        [
            "user_name" => 'tên khách hàng',
            "user_password" => 'mật khẩu',
            "user_email" => 'email',
        ]
    );

        $get_user = new User();
       
        if($get_user){
            $get_user->user_name = $validatedData['user_name'];
            $get_user->user_password = Hash::make($validatedData['user_password']); // Sử dụng Hash::make()
            $get_user->user_email = $validatedData['user_email'];
            $get_user->user_isNew = 0;
            $get_user->user_role = 0;

            $get_user->save();

            return response()->json(
                [
                    "message" => "đăng ký tài khoản thành công",
                    "user_id" =>$get_user->user_id,
                ]
            );
        }else{
            return response()->json(
                [
                    "message" => "thêm dữ liệu thất bại",
                ],422
            );
        }
    }
}
