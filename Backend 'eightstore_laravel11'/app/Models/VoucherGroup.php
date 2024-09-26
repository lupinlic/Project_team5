<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherGroup extends Model
{
    use HasFactory;

    protected $table = "tbl_voucher_group";
    protected $primaryKey = "voucherGroup_id";

    public $timestamps  = false;
}
