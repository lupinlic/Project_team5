<?php

namespace App\Http\Controllers;

use App\Models\Shipping;
use App\Http\Requests\StoreShippingRequest;
use App\Http\Requests\UpdateShippingRequest;

class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_shipping = Shipping::all();

        if(count($get_shipping)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_shipping,
                ]
            );
        }else{
            return response()->json(
                [
                    "message" => "lấy dữ liệu thất bại hoac ko co",
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
    public function store(StoreShippingRequest $request)
    {
        $get_shipping = new Shipping();
       
        if($get_shipping){
            $get_shipping->shipping_cityName = $request->shipping_cityName;
            $get_shipping->shipping_districtName = $request->shipping_districtName;
            $get_shipping->shipping_communeName = $request->shipping_communeName;
            $get_shipping->shipping_name = $request->shipping_name;
            $get_shipping->shipping_price = $request->shipping_price;


            $get_shipping->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_shipping,
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
    public function show(Shipping $shipping)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $shipping,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipping $shipping)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShippingRequest $request, Shipping $shipping)
    {
        $shipping->shipping_cityName = $request->shipping_cityName;
        $shipping->shipping_districtName = $request->shipping_districtName;
        $shipping->shipping_communeName = $request->shipping_communeName;
        $shipping->shipping_name = $request->shipping_name;
        $shipping->shipping_price = $request->shipping_price;


            $shipping->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $shipping,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipping $shipping)
    {
        $shipping->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $shipping,
                ]
            );
    }
}
