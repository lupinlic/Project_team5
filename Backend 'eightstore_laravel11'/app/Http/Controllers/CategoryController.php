<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_category = Category::all();

        if(count($get_category)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_category,
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
    public function store(StoreCategoryRequest $request)
    {
        $get_category = new Category();
       
        if($get_category){
            $get_category->category_name = $request->category_name;

            $get_category->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_category,
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
    public function show(Category $category)
    {
            return response()->json(
                [
                    "message" => "lấy dữ liệu thành công",
                    "data" => $category,
                ]
            );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
            $category->category_name = $request->category_name;

            $category->save();
            return response()->json(
                [
                    "message" => "đã update thành công",
                    "data" => $category,
                ]
            );
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
            $category->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $category,
                ]
            );
    }        

    public function ShowProducts(Category $category)
    {
        $allproduct = $category->products;

        if(count($allproduct)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $allproduct,
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
    
    public function HandleShowCategoryVoucher(Request $request ,Category $category)
    {
        // Bước 1: Lấy tất cả các voucher thuộc category
        $category_vouchers =
        Category::join('tbl_category_voucher','tbl_category_voucher.category_id','=','tbl_category.category_id')
        ->join('tbl_voucher', 'tbl_voucher.voucher_id', '=', 'tbl_category_voucher.voucher_id') 
        ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
        ->where('tbl_category.category_id',$category->category_id)
        ->where('tbl_voucher.start_date','<',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.end_date','>',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.voucher_quantity','>',0)
        ->select('tbl_voucher.*') // Chỉ lấy các cột từ tbl_voucher
        ->get();

        // Lấy ra danh sách các voucher từ category_vouchers
        // $vouchers = $category_vouchers->map(function ($category_voucher) {
        //     return $category_voucher->voucher; // Trả về voucher của mỗi category_voucher
        // });

        // Bước 2: Lọc ra các voucher thuộc user mà trạng thái vẫn là 0
        $voucherOfusers = $request->user()->voucherUsers()->where('voucherUser_status', 0)->get();

        // Lấy danh sách voucher_id từ voucherOfusers
        $voucher_idOfuser = $voucherOfusers->pluck('voucher_id')->toArray(); // Dùng pluck để lấy voucher_id trực tiếp

        // Bước 3: Lọc các voucher nằm trong danh sách voucher của user mà trạng thái là 0
        $filteredVouchers = $category_vouchers->filter(function ($voucher) use ($voucher_idOfuser) {
            return in_array($voucher->voucher_id, $voucher_idOfuser);
        })->values();

        
        // Kết quả là $filteredVouchers sẽ chứa các voucher mà user có nhưng chưa sử dụng



        if(count($category_vouchers)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $filteredVouchers,
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
}
