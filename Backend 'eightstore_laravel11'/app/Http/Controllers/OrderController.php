<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get_VoucherUser = Order::join('tbl_receiver','tbl_receiver.receiver_id','=','tbl_order.receiver_id')
                                ->join('tbl_shipping','tbl_shipping.shipping_id','=','tbl_order.shipping_id')
                                ->get();

        if(count($get_VoucherUser)>0){
            return response()->json(
                [
                    "message" => "đã lấy dữ liệu thành công",
                    "data" => $get_VoucherUser,
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
    public function store(StoreOrderRequest $request)
    {
        $get_Order = new Order();
       
        if($get_Order){
            $get_Order->order_date = $request->order_date;
            $get_Order->order_status = $request->order_status;
            $get_Order->order_totalmoney = $request->order_totalmoney;
            $get_Order->user_id = $request->user_id;
            $get_Order->order_content = $request->order_content;
            $get_Order->receiver_id = $request->receiver_id;
            if($request->shipping_id){
                $get_Order->shipping_id = $request->shipping_id;
            }else{
                $get_Order->shipping_id = null;
            }

            $get_Order->save();

            return response()->json(
                [
                    "message" => "đã thêm dữ liệu thành công",
                    "data" => $get_Order,
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
    public function show(Order $order)
    {
        return response()->json(
            [
                "message" => "lấy dữ liệu thành công",
                "data" => $order,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
            $order->order_date = $request->order_date;
            $order->order_status = $request->order_status;
            $order->order_totalmoney = $request->order_totalmoney;
            $order->user_id = $request->user_id;
            $order->order_content = $request->order_content;
            $order->receiver_id = $request->receiver_id;
            $order->shipping_id = $request->shipping_id;

            $order->save();

            return response()->json(
                [
                    "message" => "update dữ liệu thành công",
                    "data" => $order,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //$request->user()->can('delete',Order::class);

        $order->delete();

            return response()->json(
                [
                    "message" => "đã xóa thành công",
                    "data" => $order,
                ]
            );
    }
    
    public function SetStatusOrder(Order $order)
    {
        $order->order_status=1;
        $order->save();

            return response()->json(
                [
                    "message" => "đã xác nhận đơn hàng thành công",
                    "data" => $order,
                ]
            );
    }

    public function GetOrderDetailByOrder(Order $order)
    {
        $orderDetail = $order->orderDetails()->with('product')->get();

            return response()->json(
                [
                    "message" => "đã lấy thành công",
                    "data" => $orderDetail,
                ]
            );
    }

    public function ShowReceuverByOrder(Order $order)
    {
        $receiver = $order->receiver()->get();

            return response()->json(
                [
                    "message" => "đã lấy thành công",
                    "data" => $receiver,
                ]
            );
    }

    public function GetShippingByOrder(Order $order)
    {
        $Shipping = $order->shipping()->get();

            return response()->json(
                [
                    "message" => "đã lấy thành công",
                    "data" => $Shipping,
                ]
            );
    }

    public function GetOrderVoucherByOrder(Order $order)
    {
        $OrderVouchers = $order->orderVouchers()->get();

            return response()->json(
                [
                    "message" => "đã lấy thành công",
                    "data" => $OrderVouchers,
                ]
            );
    }

    public function GetTotalOrder()
    {
        $data = [
            'order_sum' => Order::sum('order_totalmoney'),
            'order_count' => Order::count(),
        ];

            return response()->json(
                [
                    "message" => "đã lấy thành công",
                    "data" => $data,
                ]
            );
    }

    public function GetTotalOrderByDate(Request $request)
    {

        $data = new \stdClass();
        $data->order_count = Order::whereBetween('order_date', [$request->start_date, $request->end_date])->count();
        $data->order_sum = Order::whereBetween('order_date', [$request->start_date, $request->end_date])->sum('order_totalmoney');

            return response()->json(
                [
                    "message" => "đã lấy thành công",
                    "data" => $data,
                ]
            );
    }
    
    public function GetTotalOrderByTime(Request $request)
    {
        //nhận vào 2 dữ liệu 1 là sẽ thống kê theo j 2. năm bao nhiêu
        $inputYear = $request->year;
        if ($inputYear < 1000) {
            // Xử lý để đưa về năm 4 chữ số
            $inputYear += 2000; // Hoặc xử lý theo cách khác tùy theo ngữ cảnh
        }
        $data=[];
        if($request->option_time){
            $data = Order::select(DB::raw('QUARTER(order_date) as quarter, YEAR(order_date) as year, SUM(order_totalmoney) as sum'))
            ->whereYear('order_date', $inputYear)
            ->groupBy(DB::raw('YEAR(order_date), QUARTER(order_date)'))
            ->get();
        }else{
            $data = Order::select(DB::raw('MONTH(order_date) as month, YEAR(order_date) as year, SUM(order_totalmoney) as sum'))
            ->whereYear('order_date',$inputYear)
            ->groupBy(DB::raw('YEAR(order_date), MONTH(order_date)'))
            ->get();      
        }
        return response()->json(
            [
                "message" => "đã lấy thành công",
                "data" => $data,
            ]
        );
        
    }
    
}
