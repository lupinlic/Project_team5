<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryVoucher extends Model
{
    use HasFactory;

    protected $table = "tbl_category_voucher";
    protected $primaryKey = "categoryVoucher_id";

    public $timestamps  = false;

    public function category(){
        return $this->belongsTo(Category::class,'category_id','category_id');
    }

    public function voucher(){
        return $this->belongsTo(Voucher::class,'voucher_id','voucher_id');
    }
}
