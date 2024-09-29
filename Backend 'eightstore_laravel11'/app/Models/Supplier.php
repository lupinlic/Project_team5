<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    protected $table = "tbl_supplier";
    protected $primaryKey = "supplier_id";
    public $timestamps  = false;

    public function products(){
        return $this->hasMany(Product::class,'product_id','product_id');
    }

}
