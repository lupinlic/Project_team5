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
}
