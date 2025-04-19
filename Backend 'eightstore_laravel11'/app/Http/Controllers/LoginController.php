<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function User_Login(Request $request){
        $user_email = $request->user_email;
        $user_password = $request->user_password;

        $status = Auth::attempt(['user_email'=>$user_email,'password'=>$user_password]);

        if($status){
            $user = Auth::user();
            
            $token = $request->user()->createToken('Token_name');

            return response()->json([
                'message' => 'đăng nhập thành công',
                'user' => [
                    'user_id' => $user->user_id,
                    'user_role' => $user->user_role,
                    'user_name' => $user->user_name,
                ],
                'token' => $token->plainTextToken,
            ]);
        }
        return response()->json([
            'message' => 'đăng nhập thất bại sai tk hoặc mk',
        ],401);
    }

    public function ShowProfile(Request $request){
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                'data' => $request->user(),
            ]
        );
    }
}
