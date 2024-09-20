<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Http\Requests\StoreCityRequest;
use App\Http\Requests\UpdateCityRequest;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_city = City::all();

        if(count($get_city)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_city,
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
    public function store(StoreCityRequest $request)
    {
        $get_city = new City();
       
        if($get_city){
            $get_city->city_name = $request->city_name;

            $get_city->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_city,
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
    public function show(City $city)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $city,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCityRequest $request, City $city)
    {
        $city->city_name = $request->city_name;

            $city->save();
            return response()->json(
                [
                    "message" => "đã update thành công",
                    "data" => $city,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        $city->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $city,
                ]
            );
    }
}
