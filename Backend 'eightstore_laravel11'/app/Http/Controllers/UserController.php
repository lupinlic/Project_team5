<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Hash;
use App\Policies\UserPolicy;
use Carbon\Carbon;

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
            $get_user->user_password = Hash::make($request->user_password); // Sử dụng Hash::make()
            // $get_user->user_password = $request->user_password;
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

    public function HandleCart(User $user)
    {
        $get_cart = $user->carts()->with('product')->get();
        $count_cart = $user->carts()->count('cart_id');

        return response()->json(
            [
                "message" => "đã lấy dữ liệu thành công",
                "data" => $get_cart,
                 "count_cart" => $count_cart,
            ]
        );
    }

    public function ShowReceivers(User $user)
    {
        $get_receivers = $user->receivers;

        if(count($get_receivers)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_receivers,
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

    public function ShowVouchers(User $user,$voucher_status)
    {
        switch($voucher_status){
            case 0:
                $get_voucher = $user->voucherUsers()
                ->join('tbl_voucher','tbl_voucher.voucher_id','=','tbl_voucher_user.voucher_id')
                ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
                ->where('tbl_voucher_user.voucherUser_status',$voucher_status)
                ->where('tbl_voucher.end_date','>',Carbon::now()->format('Y-m-d H:i:s'))
                ->select('tbl_voucher.*','tbl_voucher_group.*')
                ->get();
                break;
            case 1:
                $get_voucher = $user->voucherUsers()
                ->join('tbl_voucher','tbl_voucher.voucher_id','=','tbl_voucher_user.voucher_id')
                ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
                ->where('tbl_voucher_user.voucherUser_status',$voucher_status)
                ->where('tbl_voucher.start_date','<',Carbon::now()->format('Y-m-d H:i:s'))
                ->select('tbl_voucher.*','tbl_voucher_group.*')
                ->get();
                break;
            case 2:
                $get_voucher = $user->voucherUsers()
                ->join('tbl_voucher','tbl_voucher.voucher_id','=','tbl_voucher_user.voucher_id')
                ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
                ->where('tbl_voucher.end_date','<',Carbon::now()->format('Y-m-d H:i:s'))
                ->select('tbl_voucher.*','tbl_voucher_group.*')
                ->get();
                break;
        }

        if(count($get_voucher)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_voucher,
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
    public function showByType(User $user)
    {
        $get_receivers = $user->receivers()->where('receiver_type',1)->get();
        // $receiver= Receiver::where('receiver_type',1)->get();

            return response()->json(
                [
                    "message" => "đã get thành công",
                    "data" => $get_receivers,
                ]
            );
    }
    
    public function GetOrderByUser(User $user)
    {
        $get_orders = $user->orders()->get();
        // $receiver= Receiver::where('receiver_type',1)->get();

            return response()->json(
                [
                    "message" => "đã get thành công",
                    "data" => $get_orders,
                ]
            );
    }

    public function GetUserStatistical()
    {
        $data = new \stdClass();
        $data->user_count = User::where('user_role',0)->count();
            return response()->json(
                [
                    "message" => "đã get thành công",
                    "data" => $data,
                ]
            );
    }
    
}