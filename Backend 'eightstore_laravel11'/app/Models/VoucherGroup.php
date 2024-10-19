<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherGroup extends Model
{
    use HasFactory;

    protected $table = "tbl_voucher_group";
    protected $primaryKey = "voucherGroup_id";

    protected $fillable = [
        'voucherGroup_name',
        'voucherGroup_img',
        'voucherGroup_dsc',
    ];

    public $timestamps  = false;

    public function vouchers(){
        return $this->hasMany(Voucher::class,'voucherGroup_id','voucherGroup_id');
    }
}
