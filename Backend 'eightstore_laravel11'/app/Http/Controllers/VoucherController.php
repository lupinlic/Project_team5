<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Http\Requests\StoreVoucherRequest;
use App\Http\Requests\UpdateVoucherRequest;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_voucher = Voucher::join('tbl_voucher_group','tbl_voucher.voucherGroup_id','=','tbl_voucher_group.voucherGroup_id')->get();

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
    public function store(StoreVoucherRequest $request)
    {
        $get_voucher = new Voucher();
       
        if($get_voucher){
            $get_voucher->voucherGroup_id = $request->voucherGroup_id;
            $get_voucher->voucher_type = $request->voucher_type;
            $get_voucher->voucher_discount = $request->voucher_discount;
            $get_voucher->voucher_minOrder = $request->voucher_minOrder;
            $get_voucher->voucher_maxDiscount = $request->voucher_maxDiscount;
            $get_voucher->voucher_code = $request->voucher_code;
            $get_voucher->voucher_quantity = $request->voucher_quantity;
            $get_voucher->voucher_dsc = $request->voucher_dsc;
            $get_voucher->start_date = $request->start_date;
            $get_voucher->end_date = $request->end_date;

            $get_voucher->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_voucher,
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
    public function show(Voucher $voucher)
    {
        $get_voucher = Voucher::join('tbl_voucher_group','tbl_voucher.voucherGroup_id','=','tbl_voucher_group.voucherGroup_id')
                            ->where('voucher_id',$voucher->voucher_id)->get();

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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voucher $voucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoucherRequest $request, Voucher $voucher)
    {
        $voucher->voucherGroup_id = $request->voucherGroup_id;
            $voucher->voucher_type = $request->voucher_type;
            $voucher->voucher_discount = $request->voucher_discount;
            $voucher->voucher_minOrder = $request->voucher_minOrder;
            $voucher->voucher_maxDiscount = $request->voucher_maxDiscount;
            $voucher->voucher_code = $request->voucher_code;
            $voucher->voucher_quantity = $request->voucher_quantity;
            $voucher->voucher_dsc = $request->voucher_dsc;
            $voucher->start_date = $request->start_date;
            $voucher->end_date = $request->end_date;
            $voucher->save();


            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $voucher,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voucher $voucher)
    {
        $voucher->delete();

        return response()->json(
            [
                "message" => "đã xóa thành công",
                "data" => $voucher,
            ]
        );
    }
}
