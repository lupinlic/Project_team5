<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_supplier = Supplier::all();

        if($get_supplier){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_supplier,
                ]
            );
        }else{
            return response()->json(
                [
                    "message" => "lấy dữ liệu thất bại",
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
    public function store(StoreSupplierRequest $request)
    {
        $get_supplier = new Supplier();
       
        if($get_supplier){
            $get_supplier->supplier_name = $request->supplier_name;
            $get_supplier->supplier_address = $request->supplier_address;
            $get_supplier->supplier_email = $request->supplier_email;
            $get_supplier->supplier_phone = $request->supplier_phone;

            $get_supplier->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_supplier,
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
    public function show(Supplier $supplier)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $supplier,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
            $supplier->supplier_name = $request->supplier_name;
            $supplier->supplier_address = $request->supplier_address;
            $supplier->supplier_email = $request->supplier_email;
            $supplier->supplier_phone = $request->supplier_phone;

            $supplier->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $supplier,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $supplier,
                ]
            );
    }
}
