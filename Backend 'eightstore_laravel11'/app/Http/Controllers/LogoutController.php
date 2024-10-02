<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function User_Logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(
            [
                "message" => "đăng xuất và xóa token thành công",
                'data' => $request->user(),
            ]
        );
    }
}
