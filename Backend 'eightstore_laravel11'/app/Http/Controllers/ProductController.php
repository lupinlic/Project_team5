<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_product = Product::all();

        if(count($get_product)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_product,
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
    public function store(StoreProductRequest $request)
    {
        $get_product = new Product();
       
        if($get_product){
            $get_product->product_name = $request->product_name;
            $get_product->product_img = $request->product_img;
            $get_product->product_price = $request->product_price;
            $get_product->product_dsc = $request->product_dsc;
            $get_product->category_id = $request->category_id;
            $get_product->supplier_id = $request->supplier_id;
            $get_product->product_quantity = $request->product_quantity;


            $get_product->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_product,
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
    public function show(Product $product)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $product,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
            $product->product_name = $request->product_name;
            $product->product_img = $request->product_img;
            $product->product_price = $request->product_price;
            $product->product_dsc = $request->product_dsc;
            $product->category_id = $request->category_id;
            $product->supplier_id = $request->supplier_id;
            $product->product_quantity = $request->product_quantity;


            $product->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $product,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $product,
                ]
            );
    }
}
