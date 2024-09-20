<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

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
}
