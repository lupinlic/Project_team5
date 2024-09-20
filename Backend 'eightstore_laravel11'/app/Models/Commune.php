<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;

    protected $table = "tbl_commune";
    protected $primaryKey = "commune_id";

    public $timestamps  = false;
}
