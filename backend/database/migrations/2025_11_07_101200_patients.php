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
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->string('email')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->date('birth_date');
            $table->enum('gender',['M','F','Altro']); 
            $table->string('occupation',30)->nullable();
            $table->string('sports_hobbies',50)->nullable();
            $table->string('marital_status',30)->nullable();
            $table->string('diagnosis',50)->nullable();        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(); 
    }
};
