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

    public function product(){
        return $this->belongsTo(Product::class,'product_id','product_id');
    }

    public function voucher(){
        return $this->belongsTo(Voucher::class,'voucher_id','voucher_id');
    }
}
