<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Http\Requests\StoreOrderDetailRequest;
use App\Http\Requests\UpdateOrderDetailRequest;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_VoucherUser = OrderDetail::join('tbl_order','tbl_order_detail.order_id','=','tbl_order_detail.order_id')
                                ->join('tbl_product','tbl_order_detail.product_id','=','tbl_product.product_id')
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
    public function store(StoreOrderDetailRequest $request)
    {
        $get_OrderDetail = new OrderDetail();
       
        if($get_OrderDetail){
            $get_OrderDetail->order_id = $request->order_id;
            $get_OrderDetail->product_id = $request->product_id;
            $get_OrderDetail->orderDetail_quantity = $request->orderDetail_quantity;
            $get_OrderDetail->orderDetail_total = $request->orderDetail_total;

            $get_OrderDetail->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_OrderDetail,
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
    public function show(OrderDetail $orderDetail)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $orderDetail,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderDetail $orderDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderDetailRequest $request, OrderDetail $orderDetail)
    {
        $orderDetail->order_id = $request->order_id;
        $orderDetail->product_id = $request->product_id;
        $orderDetail->orderDetail_quantity = $request->orderDetail_quantity;
        $orderDetail->orderDetail_total = $request->orderDetail_total;

            $orderDetail->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $orderDetail,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDetail $orderDetail)
    {
        $orderDetail->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $orderDetail,
                ]
            );
    }
}
