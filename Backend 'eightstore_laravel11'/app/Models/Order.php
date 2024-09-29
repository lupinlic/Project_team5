<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = "tbl_order";
    protected $primaryKey = "order_id";

    public $timestamps  = false;

    public function user(){
        return $this->belongsTo(User::class,'user_id','user_id');
    }

    public function receiver(){
        return $this->hasOne(Receiver::class,'receiver_id','receiver_id');
    }

    public function shipping(){
        return $this->hasOne(Shipping::class,'shipping_id','shipping_id');
    }

    public function orderDetails(){
        return $this->hasMany(OrderDetail::class,'order_id','order_id');
    }
}
