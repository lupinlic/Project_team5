<?php

namespace App\Http\Controllers;

use App\Models\VoucherUser;
use App\Http\Requests\StoreVoucherUserRequest;
use App\Http\Requests\UpdateVoucherUserRequest;

class VoucherUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_VoucherUser = VoucherUser::join('tbl_voucher','tbl_voucher_user.voucher_id','=','tbl_voucher.voucher_id')
                                        ->get();

        if(count($get_VoucherUser)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_VoucherUser,
                ]
            );
        }else{
            return response()->json(
                [
                    "message" => "lấy dữ liệu thất bại hoặc không có",
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
    public function store(StoreVoucherUserRequest $request)
    {
        $get_VoucherUser = new VoucherUser();
       
        if($get_VoucherUser){
            $get_VoucherUser->user_id = $request->user_id;
            $get_VoucherUser->voucher_id = $request->voucher_id;
            $get_VoucherUser->voucherUser_status = $request->voucherUser_status;
            $get_VoucherUser->voucherUser_date = $request->voucherUser_date;

            $get_VoucherUser->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_VoucherUser,
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
    public function show(VoucherUser $voucherUser)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $voucherUser,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VoucherUser $voucherUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoucherUserRequest $request, VoucherUser $voucherUser)
    {
            $voucherUser->user_id = $request->user_id;
            $voucherUser->voucher_id = $request->voucher_id;
            $voucherUser->voucherUser_status = $request->voucherUser_status;
            $voucherUser->voucherUser_date = $request->voucherUser_date;

            $voucherUser->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $voucherUser,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VoucherUser $voucherUser)
    {
        $voucherUser->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $voucherUser,
                ]
            );
    }
}
