<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Import HasApiTokens


class User extends Authenticatable
{
    use HasFactory,Notifiable,HasApiTokens;

    protected $table = "tbl_user";
    protected $primaryKey = "user_id";

    protected $fillable = ['user_email', 'user_password']; // Các trường có thể điền

    public function getAuthIdentifierName()
    {
        return 'user_email';
    }

    public function getAuthPassword()
    {
        return $this->user_password;
    }

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
