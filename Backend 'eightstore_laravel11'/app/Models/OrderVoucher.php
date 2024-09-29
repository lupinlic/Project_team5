<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderVoucher extends Model
{
    use HasFactory;

    protected $table = "tbl_order_voucher";
    protected $primaryKey = "orderVoucher_id";

    public $timestamps  = false;

    public function order(){
        return $this->belongsTo(Order::class,'order_id','order_id');
    }

    public function voucher(){
        return $this->belongsTo(Voucher::class,'voucher_id','voucher_id');
    }
}
