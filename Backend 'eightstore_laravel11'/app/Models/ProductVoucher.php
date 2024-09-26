<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVoucher extends Model
{
    use HasFactory;

    protected $table = "tbl_product_voucher";
    protected $primaryKey = "productVoucher_id";

    public $timestamps  = false;
}
