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
        Schema::create('tbl_coupon_catalog', function (Blueprint $table) {
            $table->increments('coupon_catalog_id');
            $table->integer('coupon_catalog_type');
            $table->string('coupon_catalog_content');
            $table->string('coupon_catalog_value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_coupon_catalog');
    }
};
