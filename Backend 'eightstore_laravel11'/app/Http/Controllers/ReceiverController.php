<?php

namespace App\Http\Controllers;

use App\Models\Receiver;
use App\Http\Requests\StoreReceiverRequest;
use App\Http\Requests\UpdateReceiverRequest;

class ReceiverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_receiver = Receiver::all();

        if(count($get_receiver)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_receiver,
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
    public function store(StoreReceiverRequest $request)
    {
        $get_receiver = new Receiver();
       
        if($get_receiver){
            $get_receiver->receiver_name = $request->receiver_name;
            $get_receiver->receiver_phone = $request->receiver_phone;
            $get_receiver->user_id = $request->user_id;
            $get_receiver->city_id = $request->city_id;
            $get_receiver->district_id = $request->district_id;
            $get_receiver->commune_id = $request->commune_id;


            $get_receiver->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_receiver,
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
    public function show(Receiver $receiver)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $receiver,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receiver $receiver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceiverRequest $request, Receiver $receiver)
    {
        $receiver->receiver_name = $request->receiver_name;
        $receiver->receiver_phone = $request->receiver_phone;
        $receiver->user_id = $request->user_id;
        $receiver->city_id = $request->city_id;
        $receiver->district_id = $request->district_id;
        $receiver->commune_id = $request->commune_id;


            $receiver->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $receiver,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receiver $receiver)
    {
        $receiver->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $receiver,
                ]
            );
    }
}
