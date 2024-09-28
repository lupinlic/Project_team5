<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_VoucherUser = Order::join('tbl_receiver','tbl_order.receiver_id','=','tbl_order.receiver_id')
                                ->join('tbl_shipping','tbl_order.receiver_id','=','tbl_order.receiver_id')
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
    public function store(StoreOrderRequest $request)
    {
        $get_Order = new Order();
       
        if($get_Order){
            $get_Order->order_date = $request->order_date;
            $get_Order->order_status = $request->order_status;
            $get_Order->order_totalmoney = $request->order_totalmoney;
            $get_Order->user_id = $request->user_id;
            $get_Order->order_content = $request->order_content;
            $get_Order->receiver_id = $request->receiver_id;
            $get_Order->shipping_id = $request->shipping_id;

            $get_Order->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_Order,
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
    public function show(Order $order)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $order,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
            $order->order_date = $request->order_date;
            $order->order_status = $request->order_status;
            $order->order_totalmoney = $request->order_totalmoney;
            $order->user_id = $request->user_id;
            $order->order_content = $request->order_content;
            $order->receiver_id = $request->receiver_id;
            $order->shipping_id = $request->shipping_id;

            $order->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $order,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $order,
                ]
            );
    }
}
