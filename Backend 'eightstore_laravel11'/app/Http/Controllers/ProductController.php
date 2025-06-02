<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $get_product = Product::all();

    if (count($get_product) > 0) {
      return response()->json(
        [
          "message" => "đã lấy dữ liệu thành công",
          "data" => $get_product,
        ]
      );
    } else {
      return response()->json(
        [
          "message" => "lấy dữ liệu thất bại hoac ko co",
        ]
      );
    }
  }


  public function getProductsForCondition(Request $request)
  {
    $query = Product::with(['category', 'supplier']);

    // Tìm kiếm nâng cao
    if ($request->has('searchType') && $request->has('inputValue')) {
      $value = $request->inputValue;

      switch ($request->searchType) {
        case 'product':
          $query->where('product_name', 'like', "%$value%");
          break;

        case 'category':
          $query->whereHas('category', function ($q) use ($value) {
            $q->where('category_name', 'like', "%$value%");
          });
          break;

        case 'supplier':
          $query->whereHas('supplier', function ($q) use ($value) {
            $q->where('supplier_name', 'like', "%$value%");
          });
          break;
      }
    }

    // Sắp xếp
    if ($request->has('sort')) {
      if ($request->sort === 'price') {
        $query->orderBy('product_price', 'asc');
      } elseif ($request->sort === 'price') {
        $query->orderBy('product_price', 'desc');
      }
    }

    return response()->json([
      "message" => "Lấy dữ liệu thành công",
      "data" => $query->get()
    ]);
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
    $category = Category::where('category_id', $request->category_id)->first();
    if ($request->has('img')) {
      $file = $request->file('img');

      $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
      $file_name = time() . '-' . $request->product_name . '.' . $extension;
      $filterFile_name = preg_replace('/[^A-Za-z0-9\-_.]/', '_', $file_name);

      $file->move(public_path('uploads/Categories/' . $category->category_name), $filterFile_name);

      $request->merge(['product_img' => $filterFile_name]);

      if (Product::create($request->all())) {

        return response()->json(
          [
            "message" => "đã thêm dữ liệu thành công",
          ]
        );
      } else {
        return response()->json(
          [
            "message" => "thêm dữ liệu thất bại",
          ]
        );
      }
    } else {
      return response()->json(
        [
          "message" => "không có file ảnh đc gửi lên",
        ],
        422
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
    $category = Category::where('category_id', $product->category_id)->first();
    if ($request->has('img')) {
      $file = $request->file('img');

      //xóa bỏ ảnh cũ
      $filePath = public_path('uploads\\Categories\\' . $category->category_name . '\\' . $product->product_img);
      if (file_exists($filePath)) {
        unlink($filePath);
        // Thông báo thành công
      }
      // lưu ảnh mới
      $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
      $file_name = time() . '-' . $request->product_name . '.' . $extension;
      $filterFile_name = preg_replace('/[^A-Za-z0-9\-_.]/', '_', $file_name);

      $file->move(public_path('uploads/Categories/' . $category->category_name), $filterFile_name);

      $request->merge(['product_img' => $filterFile_name]);

      //update dữ liệu
      $product->update($request->all());
    } else {
      $request->only(['product_name', 'product_price', 'product_dsc', 'category_id', 'supplier_id', 'product_quantity']);
      $product->update($request->all());
    }
    return response()->json(
      [
        "message" => "đã update dữ liệu thành công",
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

  public function ProductisNew()
  {
    $get_product = Product::orderBy('product_id', 'desc')->limit(5)->get();

    if (count($get_product) > 0) {
      return response()->json(
        [
          "message" => "đã lấy dữ liệu thành công",
          "data" => $get_product,
        ]
      );
    } else {
      return response()->json(
        [
          "message" => "lấy dữ liệu thất bại hoac ko co",
        ]
      );
    }
  }

  public function HandleShowProductVoucher(Request $request, Product $product)
  {
    // Bước 1: Lấy tất cả các voucher thuộc category
    $category_vouchers =
      Product::join('tbl_product_voucher', 'tbl_product_voucher.product_id', '=', 'tbl_product.product_id')
      ->join('tbl_voucher', 'tbl_voucher.voucher_id', '=', 'tbl_product_voucher.voucher_id')
      ->join('tbl_voucher_group', 'tbl_voucher_group.voucherGroup_id', '=', 'tbl_voucher.voucherGroup_id')
      ->where('tbl_product.product_id', $product->product_id)
      ->where('tbl_voucher.start_date', '<', Carbon::now()->format('Y-m-d H:i:s'))
      ->where('tbl_voucher.end_date', '>', Carbon::now()->format('Y-m-d H:i:s'))
      ->where('tbl_voucher.voucher_quantity', '>', 0)
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



    if (count($category_vouchers) > 0) {
      return response()->json(
        [
          "message" => "đã lấy dữ liệu thành công",
          "data" => $filteredVouchers,
        ]
      );
    } else {
      return response()->json(
        [
          "message" => "lấy dữ liệu thất bại hoac ko co",
        ]
      );
    }
  }

  public function showVoucherByNameOfProduct(Request $request, Product $product)
  {

    $voucher =
      Product::join('tbl_product_voucher', 'tbl_product_voucher.product_id', '=', 'tbl_product.product_id')
      ->join('tbl_voucher', 'tbl_voucher.voucher_id', '=', 'tbl_product_voucher.voucher_id')
      ->join('tbl_voucher_group', 'tbl_voucher_group.voucherGroup_id', '=', 'tbl_voucher.voucherGroup_id')
      ->where('tbl_product.product_id', $product->product_id)
      ->where('tbl_voucher.voucher_code', $request->voucher_code)
      ->where('tbl_voucher.start_date', '<', Carbon::now()->format('Y-m-d H:i:s'))
      ->where('tbl_voucher.end_date', '>', Carbon::now()->format('Y-m-d H:i:s'))
      ->where('tbl_voucher.voucher_quantity', '>', 0)
      ->select('tbl_voucher.*', 'tbl_voucher_group.*') // Chỉ lấy các cột từ tbl_voucher
      ->get();

    // Bước 2: Lọc ra các voucher thuộc user mà trạng thái vẫn là 0
    $voucherOfusers = $request->user()->voucherUsers()->where('voucherUser_status', 0)->get();

    // Lấy danh sách voucher_id từ voucherOfusers
    $voucher_idOfuser = $voucherOfusers->pluck('voucher_id')->toArray(); // Dùng pluck để lấy voucher_id trực tiếp

    // Bước 3: Lọc các voucher nằm trong danh sách voucher của user mà trạng thái là 0
    $filteredVouchers = $voucher->filter(function ($voucher) use ($voucher_idOfuser) {
      return in_array($voucher->voucher_id, $voucher_idOfuser);
    })->values();


    // Kết quả là $filteredVouchers sẽ chứa các voucher mà user có nhưng chưa sử dụng



    if (count($voucher) > 0) {
      return response()->json(
        [
          "message" => "đã lấy dữ liệu thành công",
          "data" => $filteredVouchers,
        ]
      );
    } else {
      return response()->json(
        [
          "message" => "lấy dữ liệu thất bại hoac ko co",
        ]
      );
    }
  }

  public function HandleStatistical_Product()
  {
    $products = Product::join('tbl_order_detail', 'tbl_order_detail.product_id', '=', 'tbl_product.product_id')
      ->select('product_name', DB::raw('SUM(orderDetail_quantity) as quantity'))
      ->groupBy('product_name')
      ->orderBy('quantity', 'desc')
      ->limit(6)
      ->get();

    if ($products) {
      return response()->json(
        [
          "message" => "đã lấy dữ liệu thành công",
          "data" => $products,
        ]
      );
    } else {
      return response()->json(
        [
          "message" => "lấy dữ liệu thất bại hoac ko co",
        ]
      );
    }
  }

  public function HandleStatistical_ProductByDate(Request $request)
  {
    $products = Product::join('tbl_order_detail', 'tbl_order_detail.product_id', '=', 'tbl_product.product_id')
      ->select('product_name', DB::raw('SUM(orderDetail_quantity) as quantity'))
      ->whereBetween('orderDetail_date', [$request->start_date, $request->end_date])
      ->groupBy('product_name')
      ->orderBy('quantity', 'desc')
      ->limit(6)
      ->get();

    if ($products) {
      return response()->json(
        [
          "message" => "đã lấy dữ liệu thành công",
          "data" => $products,
        ]
      );
    } else {
      return response()->json(
        [
          "message" => "lấy dữ liệu thất bại hoac ko co",
        ]
      );
    }
  }
}
