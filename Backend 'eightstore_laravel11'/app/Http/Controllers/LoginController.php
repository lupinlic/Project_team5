<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function User_Login(Request $request){
        $user_email = $request->user_email;
        $user_password = $request->user_password;

        $user = User::where('user_email',$user_email,)
                        ->where('user_password',$user_password,)->first();

        if($user){
            $request->session()->regenerate();

        // Lưu thông tin người dùng vào session
            $request->session()->put('user', $user);
            return response()->json([
                'message' => 'đăng nhập thành công',
                'user_role' => $user->user_role,
            ]);
        }
        return response()->json([
            'message' => 'đăng nhập thất bại sai tk hoặc mk',
        ]);
    }
}
