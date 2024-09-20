<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_shipping', function (Blueprint $table) {
            $table->increments('shipping_id');
            $table->integer('city_id');
            $table->integer('district_id');
            $table->integer('commune_id');
            $table->integer('shipping_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_shipping');
    }
};
