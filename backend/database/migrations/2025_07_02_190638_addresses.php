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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            $table->string('country');
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('street');
            $table->string('building')->nullable();
            $table->string('apartment')->nullable();
            $table->string('postal_code')->nullable();

            $table->boolean('is_default')->default(false); // to auto-fill checkout

            $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
