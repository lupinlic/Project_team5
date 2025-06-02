<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryProductController;
use App\Http\Controllers\CategoryVoucherController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\OrderVoucherController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVoucherController;
use App\Http\Controllers\ReceiverController;
use App\Http\Controllers\RegesterController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProductController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\VoucherGroupController;
use App\Http\Controllers\VoucherUserController;
use App\Models\User;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//web sẽ phân ra làm 2 phần
//  trc khi đăng nhập thì đc xem show product theo category hoac ko
//chức năng chung của cả 2
//  receiver,cart

//riêng biệt :
//2 là bên admin
// nếu mà là admin thì ms đc vào 1 số phần giới hạn như sau:
// user:sửa,xóa ; shippings ; category:sửa,xóa 

//trang chủ
//  --hiện sp hiện kho voucher chung
Route::apiResource('products', ProductController::class)->only('index', 'show');
Route::get('products/news', [ProductController::class, 'ProductisNew']);
Route::get('vouchers', [VoucherController::class, 'index']);
Route::get('categorys/{category}/products', [CategoryController::class, 'ShowProducts']);
Route::get('suppliers/{supplier}/products', [SupplierController::class, 'ShowProducts']);
Route::apiResource('categorys', CategoryController::class)->only('index', 'show');
Route::get('getconditionOfProducts', [ProductController::class, 'getProductsForCondition']);



Route::middleware('auth:sanctum')->group(function () {
  //  --customer

  //  --1.lấy profile sau khi đăng nhập
  Route::get('auth/profile', [LoginController::class, 'ShowProfile']);

  //  --2. show ra các thông tin mà customer có thể thấy
  Route::apiResource('users', UserController::class)->only('index', 'show', 'update', 'destroy');
  Route::get('users/{user}/carts', [UserController::class, 'HandleCart']);

  Route::get('users/{user}/receivers', [UserController::class, 'ShowReceivers']);
  Route::get('users/{user}/receivers/type', [UserController::class, 'showByType']);
  Route::get('users/{user}/vouchers/{voucher_status}', [UserController::class, 'ShowVouchers']);
  Route::apiResource('carts', CartController::class);
  Route::apiResource('receivers', ReceiverController::class);
  Route::get('users/{user}/receivers/{receiver}/status', [ReceiverController::class, 'HandleStatus']);
  Route::apiResource('suppliers', SupplierController::class)->only('index', 'show');
  Route::apiResource('vouchers', VoucherController::class)->only('index', 'show');
  Route::apiResource('voucherGroups', VoucherGroupController::class)->only('index', 'show');
  Route::apiResource('orders', OrderController::class)->only('index', 'show', 'store', 'destroy');

  Route::apiResource('orderDetails', OrderDetailController::class)->only('index', 'show', 'store');
  Route::apiResource('orderVouchers', OrderVoucherController::class)->only('index', 'show', 'store');


  Route::get('voucher/{voucher}/quantity', [VoucherController::class, 'HandleSetQuantityOfVoucher']);
  Route::get('category/{category}/categoryVouchers', [CategoryController::class, 'HandleShowCategoryVoucher']);
  Route::get('product/{product}/productVouchers', [ProductController::class, 'HandleShowProductVoucher']);
  Route::post('product/{product}/productVoucherByName', [ProductController::class, 'showVoucherByNameOfProduct']);

  Route::get('voucherGroup/vouchersOfGroupShop', [VoucherGroupController::class, 'HandleShowVoucherOfShop']);
  Route::post('voucherGroup/vouchersOfGroupShopByName', [VoucherGroupController::class, 'showVoucherByNameOfShop']);

  Route::get('voucherGroup/vouchersOfShip', [VoucherGroupController::class, 'HandleShowVoucherOfShip']);
  Route::post('shipping', [ShippingController::class, 'HandleShowShippingByName']);
  Route::get('order/{order}/receiver', [OrderController::class, 'ShowReceuverByOrder']);
  Route::get('voucherUser/{voucher}/status', [VoucherUserController::class, 'HandleStatus']);
  Route::get('order/{order}/orderDetail', [OrderController::class, 'GetOrderDetailByOrder']);
  Route::get('order/{order}/status', [OrderController::class, 'SetStatusOrder']);
  Route::get('order/{order}/shipping', [OrderController::class, 'GetShippingByOrder']);
  Route::get('order/{order}/orderVoucher', [OrderController::class, 'GetOrderVoucherByOrder']);
  Route::get('user/{user}/orders', [UserController::class, 'GetOrderByUser']);




  //  --nd đăng nhập xog thì ms đăng xuất đc
  Route::get('user/logout', [LogoutController::class, 'User_Logout']);


  //admin
  Route::middleware('admin')->group(function () {
    Route::apiResource('users', UserController::class)->only('store');
    Route::apiResource('categorys', CategoryController::class)->only('store', 'update', 'destroy');
    Route::apiResource('products', ProductController::class)->only('store', 'update', 'destroy');
    Route::apiResource('suppliers', SupplierController::class)->only('store', 'update', 'destroy');
    Route::apiResource('vouchers', VoucherController::class)->only('store', 'update', 'destroy');
    Route::apiResource('voucherGroups', VoucherGroupController::class)->only('store', 'update', 'destroy');
    Route::post('voucherGroups/upload', [VoucherGroupController::class, 'HandleUploadFile']);
    Route::apiResource('orders', OrderController::class)->only('update');
    Route::apiResource('orderDetails', OrderDetailController::class)->only('update', 'destroy');

    Route::apiResource('shippings', ShippingController::class);
    Route::apiResource('voucherUsers', VoucherUserController::class);
    Route::apiResource('categoryVouchers', CategoryVoucherController::class);
    Route::apiResource('productVouchers', ProductVoucherController::class);
    Route::apiResource('orderVouchers', OrderVoucherController::class)->only('update', 'destroy');

    Route::get('voucherGroup/{voucherGroup}/vouchers', [VoucherGroupController::class, 'HandleShowVoucherOfVoucherGroup']);
    Route::get('productVouchers/{voucher}/product', [ProductVoucherController::class, 'GetProductByVoucher']);
    Route::get('categoryVouchers/{voucher}/category', [CategoryVoucherController::class, 'GetcategoryByVoucher']);

    Route::get('product/statistical', [ProductController::class, 'HandleStatistical_Product']);
    Route::post('product/statisticalByDate', [ProductController::class, 'HandleStatistical_ProductByDate']);

    Route::get('order/statistical', [OrderController::class, 'GetTotalOrder']);
    Route::post('order/statisticalByLinechart', [OrderController::class, 'GetTotalOrderByTime']);
    Route::post('order/statisticalByDate', [OrderController::class, 'GetTotalOrderByDate']);
    Route::get('user/statistical', [UserController::class, 'GetUserStatistical']);

    //tạo voucher mới sẽ add hết cho từng user
    Route::get('voucher/{voucher_id}/addvoucherToUsers', [VoucherController::class, 'HandleAddVoucherToUsers']);
  });
});

// Route::post('voucher/voucherByName',[VoucherController::class,'showVoucherByName']);                                       
Route::post('user/login', [LoginController::class, 'User_Login']);
Route::post('user/regester', [RegesterController::class, 'User_Regester']);
Route::get('user/{user_id}/addvouchers', [VoucherController::class, 'HandleAddVoucherToUserNew']);
