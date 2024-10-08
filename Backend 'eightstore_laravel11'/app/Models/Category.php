<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = "tbl_category";
    protected $primaryKey = "category_id";

    public $timestamps  = false;

    public function products(){
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }
    public function category_vouchers(){
        return $this->hasMany(CategoryVoucher::class, 'category_id', 'category_id');
    }
}
