<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = "tbl_product";
    protected $primaryKey = "product_id";

    protected $fillable = [
        'product_name',
        'product_img',
        'product_price',
        'product_dsc',
        'category_id',
        'supplier_id',
        'product_quantity',
    ];
    public $timestamps  = false;

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }
}
