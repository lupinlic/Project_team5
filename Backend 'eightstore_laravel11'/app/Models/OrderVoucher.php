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
}
