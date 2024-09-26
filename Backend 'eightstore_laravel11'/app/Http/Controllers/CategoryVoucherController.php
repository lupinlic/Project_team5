<?php

namespace App\Http\Controllers;

use App\Models\CategoryVoucher;
use App\Http\Requests\StoreCategoryVoucherRequest;
use App\Http\Requests\UpdateCategoryVoucherRequest;

class CategoryVoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_CategoryVoucher = CategoryVoucher::join('tbl_voucher','tbl_category_voucher.voucher_id','=','tbl_voucher.voucher_id')
                                        ->get();

        if(count($get_CategoryVoucher)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_CategoryVoucher,
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
    public function store(StoreCategoryVoucherRequest $request)
    {
        $get_CategoryVoucher = new CategoryVoucher();
       
        if($get_CategoryVoucher){
            $get_CategoryVoucher->category_id = $request->category_id;
            $get_CategoryVoucher->voucher_id = $request->voucher_id;
            $get_CategoryVoucher->categoryVoucher_dsc = $request->categoryVoucher_dsc;

            $get_CategoryVoucher->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_CategoryVoucher,
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
    public function show(CategoryVoucher $categoryVoucher)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $categoryVoucher,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryVoucher $categoryVoucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryVoucherRequest $request, CategoryVoucher $categoryVoucher)
    {
        $categoryVoucher->category_id = $request->category_id;
            $categoryVoucher->voucher_id = $request->voucher_id;
            $categoryVoucher->categoryVoucher_dsc = $request->categoryVoucher_dsc;

            $categoryVoucher->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $categoryVoucher,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryVoucher $categoryVoucher)
    {
        $categoryVoucher->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $categoryVoucher,
                ]
            );
    }
}
