<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegesterController extends Controller
{
    public function User_Regester(StoreUserRequest $request){
        $get_user = new User();
       
        if($get_user){
            $get_user->user_name = $request->user_name;
            $get_user->user_password = Hash::make($request->user_password); // Sử dụng Hash::make()
            // $get_user->user_password = $request->user_password;
            $get_user->user_email = $request->user_email;
            $get_user->user_isNew = $request->user_isNew;
            $get_user->user_role = $request->user_role;

            $get_user->save();

            return response()->json(
                [
                    "message" => "đăng ký tài khoản thành công",
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
