<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
    
    protected $table = "tbl_voucher";
    protected $primaryKey = "voucher_id";

    public $timestamps  = false;

    public function voucherGroup(){
        return $this->belongsTo(VoucherGroup::class,'voucherGroup_id','voucherGroup_id');
    }

    public function voucherProducts(){
        return $this->hasMany(ProductVoucher::class,'voucher_id','voucher_id');
    }

    public function voucherCategorys(){
        return $this->hasMany(CategoryVoucher::class,'voucher_id','voucher_id');
    }
}
