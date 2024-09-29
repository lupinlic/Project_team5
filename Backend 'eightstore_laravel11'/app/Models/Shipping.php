<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $table = "tbl_shipping";
    protected $primaryKey = "shipping_id";

    public $timestamps  = false;

    public function order(){
        return $this->belongsTo(Order::class,'shipping_id','shipping_id');
    }
}
