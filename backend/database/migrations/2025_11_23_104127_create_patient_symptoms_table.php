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
        Schema::create('patient_symptoms', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->foreignId('patient_history_id')->constrained('patient_histories')->onDelete('cascade');

            $table->char('type', 1)->nullable();
            $table->string('characteristic')->nullable();
            $table->string('pattern')->nullable();
            $table->string('triggering_event')->nullable();
            $table->tinyInteger('intensity_nprs')->nullable();
            $table->string('frequency')->nullable();
            $table->text('better_when')->nullable();
            $table->text('worse_when')->nullable();
            $table->string('trend')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_symptoms');
    }
};
