<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryVoucherController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\OrderVoucherController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVoucherController;
use App\Http\Controllers\ReceiverController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\VoucherGroupController;
use App\Http\Controllers\VoucherUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('users',UserController::class);
Route::apiResource('carts',CartController::class); 
Route::apiResource('receivers',ReceiverController::class);
Route::apiResource('shippings',ShippingController::class);

Route::apiResource('categorys',CategoryController::class);
Route::apiResource('products',ProductController::class);
Route::apiResource('suppliers',SupplierController::class);
Route::apiResource('vouchers',VoucherController::class);
Route::apiResource('voucherGroups',VoucherGroupController::class);
Route::apiResource('voucherUsers',VoucherUserController::class);
Route::apiResource('categoryVouchers',CategoryVoucherController::class);
Route::apiResource('productVouchers',ProductVoucherController::class);
Route::apiResource('orderVouchers',OrderVoucherController::class);
Route::apiResource('orders',OrderController::class);
Route::apiResource('orderDetails',OrderDetailController::class);


