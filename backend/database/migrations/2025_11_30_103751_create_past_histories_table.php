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
        Schema::create('past_histories', function (Blueprint $table) {
            $table->id();

            $table->foreignId('patient_history_id')->constrained('patient_histories')->onDelete('cascade');

            $table->text('other_medical_conditions')->nullable();
            $table->text('similar_episodes_treatments_outcome')->nullable();
            $table->text('medication_use')->nullable();
            $table->text('physiological_history')->nullable();
            $table->text('family_history')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('past_histories');
    }
};
