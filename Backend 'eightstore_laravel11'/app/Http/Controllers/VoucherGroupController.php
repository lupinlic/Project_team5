<?php

namespace App\Http\Controllers;

use App\Models\VoucherGroup;
use App\Http\Requests\StoreVoucherGroupRequest;
use App\Http\Requests\UpdateVoucherGroupRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class VoucherGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_VoucherGroup = VoucherGroup::all();

        if(count($get_VoucherGroup)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_VoucherGroup,
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
    public function store(StoreVoucherGroupRequest $request)
    {
        if($request->has('img')){
            $file = $request->file('img');

            $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $file_name = time() . '-' . $request->voucherGroup_name .'.'. $extension;
            $filterFile_name = preg_replace('/[^A-Za-z0-9\-_.]/', '_', $file_name);

            $file->move(public_path('uploads/VoucherGroup'),$filterFile_name);
            
            $request->merge(['voucherGroup_img'=> $filterFile_name]);

            if(VoucherGroup::create($request->all())){
                    
                    return response()->json(
                        [
                            "message" => "đã thêm dữ liệu thành công",
                        ]
                    );
                }else{
                    return response()->json(
                        [
                            "message" => "thêm dữ liệu thất bại",
                        ]
                    );
                }
        }else{
            return response()->json(
                [
                    "message" => "không có file ảnh đc gửi lên",
                ],422
            );
        }
    }
        

    /**
     * Display the specified resource.
     */
    public function show(VoucherGroup $voucherGroup)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $voucherGroup,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VoucherGroup $voucherGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoucherGroupRequest $request, VoucherGroup $voucherGroup)
    {
        if($request->has('img')){
            $file = $request->file('img');

            //xóa bỏ ảnh cũ
            $filePath = public_path('uploads\\VoucherGroup\\'.$voucherGroup->voucherGroup_img);
            if (file_exists($filePath)) {
                unlink($filePath);
                // Thông báo thành công
            }
            // lưu ảnh mới
            $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $file_name = time() . '-' . $request->voucherGroup_name .'.'. $extension;
            $filterFile_name = preg_replace('/[^A-Za-z0-9\-_.]/', '_', $file_name);

            $file->move(public_path('uploads/VoucherGroup'),$filterFile_name);
            
            $request->merge(['voucherGroup_img'=> $filterFile_name]);

            //update dữ liệu
            $voucherGroup->update($request->all());
                
        }else{
            $voucherGroup->update([
                'voucherGroup_name'=>$request->voucherGroup_name,
                'voucherGroup_dsc'=>$request->voucherGroup_dsc,
            ]);
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
    public function destroy(VoucherGroup $voucherGroup)
    {
        $voucherGroup->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $voucherGroup,
                ]
            );
    }

    public function HandleShowVoucherOfShop(Request $request ,VoucherGroup $voucherGroup)
    {
        $vouchersOfGroupShop =
        $request->user()->voucherUsers()->join('tbl_voucher', 'tbl_voucher.voucher_id', '=', 'tbl_voucher_user.voucher_id') 
        ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
        ->where('tbl_voucher_user.voucherUser_status', 0)
        ->where('tbl_voucher_group.voucherGroup_id', 2)
        ->where('tbl_voucher.start_date','<',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.end_date','>',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.voucher_quantity','>',0)
        ->select('tbl_voucher.*','tbl_voucher_group.*') // Chỉ lấy các cột từ tbl_voucher
        ->get();

        if(count($vouchersOfGroupShop)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $vouchersOfGroupShop,
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

    public function HandleShowVoucherOfShip(Request $request)
    {
        $vouchersOfGroupShop =
        $request->user()->voucherUsers()->join('tbl_voucher', 'tbl_voucher.voucher_id', '=', 'tbl_voucher_user.voucher_id') 
        ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
        ->where('tbl_voucher_user.voucherUser_status', 0)
        ->where('tbl_voucher_group.voucherGroup_id', 1)
        ->where('tbl_voucher.start_date','<',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.end_date','>',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.voucher_quantity','>',0)
        ->select('tbl_voucher.*','tbl_voucher_group.*') // Chỉ lấy các cột từ tbl_voucher
        ->get();

        if(count($vouchersOfGroupShop)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $vouchersOfGroupShop,
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

    public function HandleShowVoucherOfVoucherGroup(Request $request,VoucherGroup $voucherGroup)
    {
        $vouchersOfGroupShop = $voucherGroup->vouchers()->with('voucherGroup')->get();

        if(count($vouchersOfGroupShop)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $vouchersOfGroupShop,
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

    public function showVoucherByNameOfShop(Request $request)
    {
        $vouchersOfGroupShop =
        $request->user()->voucherUsers()->join('tbl_voucher', 'tbl_voucher.voucher_id', '=', 'tbl_voucher_user.voucher_id') 
        ->join('tbl_voucher_group','tbl_voucher_group.voucherGroup_id','=','tbl_voucher.voucherGroup_id')
        ->where('tbl_voucher_user.voucherUser_status', 0)
        ->where('tbl_voucher.voucherGroup_id', 2)
        ->where('tbl_voucher.start_date','<',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.end_date','>',Carbon::now()->format('Y-m-d H:i:s'))
        ->where('tbl_voucher.voucher_quantity','>',0)
        ->where('tbl_voucher.voucher_code',$request->voucher_code)
    
        ->select('tbl_voucher.*','tbl_voucher_group.*') // Chỉ lấy các cột từ tbl_voucher
        ->get();

        if(count($vouchersOfGroupShop)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $vouchersOfGroupShop,
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

    public function HandleUploadFile(Request $request)
    {
        $file = $request->file('img');

        if($file){
            $filePath = $file->storeAs('img/VoucherGroup', $file->getClientOriginalName(), 'public');

            return response()->json(
                [
                    "message" => "đã lưu ảnh thành công",
                    "data" => $filePath,
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
