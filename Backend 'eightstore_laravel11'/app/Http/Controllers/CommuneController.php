<?php

namespace App\Http\Controllers;

use App\Models\Commune;
use App\Http\Requests\StoreCommuneRequest;
use App\Http\Requests\UpdateCommuneRequest;

class CommuneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_commune = Commune::all();

        if(count($get_commune)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_commune,
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
    public function store(StoreCommuneRequest $request)
    {
        $get_commune = new Commune();
       
        if($get_commune){
            $get_commune->commune_name = $request->commune_name;
            $get_commune->city_id = $request->city_id;
            $get_commune->district_id = $request->district_id;


            $get_commune->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_commune,
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
    public function show(Commune $commune)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $commune,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commune $commune)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommuneRequest $request, Commune $commune)
    {
            $commune->commune_name = $request->commune_name;
            $commune->city_id = $request->city_id;
            $commune->district_id = $request->district_id;

            $commune->save();
            return response()->json(
                [
                    "message" => "đã update thành công",
                    "data" => $commune,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commune $commune)
    {
        $commune->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $commune,
                ]
            );
    }
}
