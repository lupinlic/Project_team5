<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CommuneController;
use App\Http\Controllers\CouponCatalogController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReceiverController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('categorys',CategoryController::class);
Route::apiResource('products',ProductController::class);
Route::apiResource('suppliers',SupplierController::class);
Route::apiResource('carts',CartController::class);
Route::apiResource('citys',CityController::class);
Route::apiResource('districts',DistrictController::class);
Route::apiResource('communes',CommuneController::class);
Route::apiResource('receivers',ReceiverController::class);
Route::apiResource('coupons',CouponController::class);
Route::apiResource('coupon_catalogs',CouponCatalogController::class);



