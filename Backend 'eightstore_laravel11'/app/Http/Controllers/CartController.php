<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_cart = Cart::join('tbl_product','tbl_cart.product_id','=','tbl_product.product_id')->get();

        if(count($get_cart)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_cart,
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
    public function store(StoreCartRequest $request)
    {
        $user = $request->user();
        $cart = $user->carts()->where('product_id',$request->product_id)->first();
        if($cart){
            $newquantity = $request->cart_quantity + $cart->cart_quantity;
            $cart->cart_quantity = $newquantity;

            $cart->save();
            return response()->json(
                [
                    "message" => "đã update dữ liệu thành công do sản phẩm này đã đc mua rồi",
                    "data" => $cart,
                ]
            );
        }else{
        $get_cart = new Cart();
       
            $get_cart->user_id = $request->user_id;
            $get_cart->product_id = $request->product_id;
            $get_cart->cart_quantity = $request->cart_quantity;
            $get_cart->cart_totalmoney = $request->cart_totalmoney;

            $get_cart->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $cart,
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $cart,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
            $cart->user_id = $request->user_id;
            $cart->product_id = $request->product_id;
            $cart->cart_quantity = $request->cart_quantity;
            $cart->cart_totalmoney = $request->cart_totalmoney;

            $cart->save();
            return response()->json(
                [
                    "message" => "đã update thành công",
                    "data" => $cart,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return response()->json(
            [
                "message" => "đã xóa thành công",
                "data" => $cart,
            ]
        );        
    }
}