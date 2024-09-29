<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = "tbl_user";
    protected $primaryKey = "user_id";

    public $timestamps  = false;

    public function voucherUsers(){
        return $this->hasMany(VoucherUser::class,'user_id','user_id');
    }

    public function carts(){
        return $this->hasMany(Cart::class,'user_id','user_id');
    }

    public function receivers(){
        return $this->hasMany(Receiver::class,'user_id','user_id');
    }

    public function orders(){
        return $this->hasMany(Order::class,'user_id','user_id');
    }
}
