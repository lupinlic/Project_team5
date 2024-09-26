<?php

namespace App\Http\Controllers;

use App\Models\ProductVoucher;
use App\Http\Requests\StoreProductVoucherRequest;
use App\Http\Requests\UpdateProductVoucherRequest;

class ProductVoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_productVoucher = ProductVoucher::join('tbl_voucher','tbl_product_voucher.voucher_id','=','tbl_voucher.voucher_id')
                                        ->get();

        if(count($get_productVoucher)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_productVoucher,
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
    public function store(StoreProductVoucherRequest $request)
    {
        $get_productVoucher = new ProductVoucher();
       
        if($get_productVoucher){
            $get_productVoucher->product_id = $request->product_id;
            $get_productVoucher->voucher_id = $request->voucher_id;
            $get_productVoucher->productVoucher_dsc = $request->productVoucher_dsc;

            $get_productVoucher->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_productVoucher,
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
    public function show(ProductVoucher $productVoucher)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $productVoucher,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductVoucher $productVoucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductVoucherRequest $request, ProductVoucher $productVoucher)
    {
        $productVoucher->product_id = $request->product_id;
            $productVoucher->voucher_id = $request->voucher_id;
            $productVoucher->productVoucher_dsc = $request->productVoucher_dsc;

            $productVoucher->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $productVoucher,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVoucher $productVoucher)
    {
        $productVoucher->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $productVoucher,
                ]
            );
    }
}
