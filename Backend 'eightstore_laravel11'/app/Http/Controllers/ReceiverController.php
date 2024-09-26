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
            $get_receiver->receiver_city = $request->receiver_city;
            $get_receiver->receiver_district = $request->receiver_district;
            $get_receiver->receiver_commune = $request->receiver_commune;
            $get_receiver->receiver_dsc = $request->receiver_dsc;
            $get_receiver->receiver_type = $request->receiver_type;


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
        $receiver->receiver_city = $request->receiver_city;
        $receiver->receiver_district = $request->receiver_district;
        $receiver->receiver_commune = $request->receiver_commune;
        $receiver->receiver_dsc = $request->receiver_dsc;
        $receiver->receiver_type = $request->receiver_type;


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
