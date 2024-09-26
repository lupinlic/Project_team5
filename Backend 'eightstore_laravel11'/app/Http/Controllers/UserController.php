<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_user = User::all();

        if($get_user){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_user,
                ]
            );
        }else{
            return response()->json(
                [
                    "message" => "lấy dữ liệu thất bại",
                ]
            );
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $get_user = new User();
       
        if($get_user){
            $get_user->user_name = $request->user_name;
            $get_user->user_password = $request->user_password;
            $get_user->user_email = $request->user_email;
            $get_user->user_isNew = $request->user_isNew;
            $get_user->user_role = $request->user_role;

            $get_user->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_user,
                ]
            );
        }else{
            return response()->json(
                [
                    "message" => "thêm dữ liệu thất bại",
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $user,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->user_name = $request->user_name;
        $user->user_password = $request->user_password;
        $user->user_email = $request->user_email;
        $user->user_isNew = $request->user_isNew;
        $user->user_role = $request->user_role;

            $user->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $user,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $user,
                ]
            );
    }
}