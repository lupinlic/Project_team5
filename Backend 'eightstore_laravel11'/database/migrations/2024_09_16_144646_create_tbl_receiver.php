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
        Schema::create('tbl_receiver', function (Blueprint $table) {
            $table->increments('receiver_id');
            $table->integer('user_id');
            $table->string('receiver_name');
            $table->string('receiver_phone');

            $table->integer('city_id');
            $table->integer('district_id');
            $table->integer('commune_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_receiver');
    }
};
