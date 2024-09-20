<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receiver extends Model
{
    use HasFactory;

    protected $table = "tbl_receiver";
    protected $primaryKey = "receiver_id";

    public $timestamps  = false;
}
