<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = "tbl_order_detail";
    protected $primaryKey = "orderDetail_id";

    public $timestamps  = false;

    public function order(){
        return $this->belongsTo(Order::class,'order_id','order_id');
    }

    public function product(){
        return $this->belongsTo(Product::class,'product_id','product_id');
    }
}
