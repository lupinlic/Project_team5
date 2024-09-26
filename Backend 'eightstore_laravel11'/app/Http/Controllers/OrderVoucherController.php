<?php

namespace App\Http\Controllers;

use App\Models\OrderVoucher;
use App\Http\Requests\StoreOrderVoucherRequest;
use App\Http\Requests\UpdateOrderVoucherRequest;

class OrderVoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_VoucherUser = OrderVoucher::join('tbl_voucher','tbl_product_voucher.voucher_id','=','tbl_voucher.voucher_id')
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
    public function store(StoreOrderVoucherRequest $request)
    {
        $get_OrderVoucher = new OrderVoucher();
       
        if($get_OrderVoucher){
            $get_OrderVoucher->order_id = $request->order_id;
            $get_OrderVoucher->voucher_id = $request->voucher_id;
            $get_OrderVoucher->orderVoucher_price = $request->orderVoucher_price;

            $get_OrderVoucher->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_OrderVoucher,
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
    public function show(OrderVoucher $orderVoucher)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $orderVoucher,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderVoucher $orderVoucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderVoucherRequest $request, OrderVoucher $orderVoucher)
    {
            $orderVoucher->order_id = $request->order_id;
            $orderVoucher->voucher_id = $request->voucher_id;
            $orderVoucher->orderVoucher_price = $request->orderVoucher_price;

            $orderVoucher->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $orderVoucher,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderVoucher $orderVoucher)
    {
        $orderVoucher->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $orderVoucher,
                ]
            );
    }
}
