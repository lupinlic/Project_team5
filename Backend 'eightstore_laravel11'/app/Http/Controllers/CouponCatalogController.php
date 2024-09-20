<?php

namespace App\Http\Controllers;

use App\Models\CouponCatalog;
use App\Http\Requests\StoreCouponCatalogRequest;
use App\Http\Requests\UpdateCouponCatalogRequest;

class CouponCatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_couponCatalog = CouponCatalog::all();

        if(count($get_couponCatalog)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_couponCatalog,
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
    public function store(StoreCouponCatalogRequest $request)
    {
        $get_couponCatalog = new CouponCatalog();
       
        if($get_couponCatalog){
            $get_couponCatalog->couponCatalog_name = $request->couponCatalog_name;

            $get_couponCatalog->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_couponCatalog,
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
    public function show(CouponCatalog $couponCatalog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CouponCatalog $couponCatalog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponCatalogRequest $request, CouponCatalog $couponCatalog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CouponCatalog $couponCatalog)
    {
        //
    }
}
