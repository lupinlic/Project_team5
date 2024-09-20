<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Http\Requests\StoreDistrictRequest;
use App\Http\Requests\UpdateDistrictRequest;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_district = District::all();

        if(count($get_district)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_district,
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
    public function store(StoreDistrictRequest $request)
    {
        $get_district = new District();
       
        if($get_district){
            $get_district->district_name = $request->district_name;
            $get_district->city_id = $request->city_id;


            $get_district->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_district,
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
    public function show(District $district)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $district,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(District $district)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDistrictRequest $request, District $district)
    {
        $district->district_name = $request->district_name;
        $district->city_id = $request->city_id;

            $district->save();
            return response()->json(
                [
                    "message" => "đã update thành công",
                    "data" => $district,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(District $district)
    {
        $district->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $district,
                ]
            );
    }
}
