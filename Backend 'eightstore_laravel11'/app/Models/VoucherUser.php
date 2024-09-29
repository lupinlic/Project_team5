<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherUser extends Model
{
    use HasFactory;
    protected $table = "tbl_voucher_user";
    protected $primaryKey = "voucherUser_id";

    public $timestamps  = false;

    public function user(){
        return $this->belongsTo(User::class,'user_id','user_id');
    }

    public function voucher(){
        return $this->belongsTo(Voucher::class,'voucher_id','voucher_id');
    }
}
