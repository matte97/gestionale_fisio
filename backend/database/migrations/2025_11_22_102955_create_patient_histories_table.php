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
        Schema::create('patient_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');

            $table->text('main_problem');
            $table->text('patient_goals');
            $table->enum('onset', ['traumatic', 'insidious']);
            $table->string('cause_of_onset');
            $table->date('onset_date')->nullable();    
            $table->text('symptomps_relationship')->nullable(); 
            $table->text('other_signs_symptomps')->nullable();
            $table->text('phisical_activity')->nullable();
            $table->text('sleep_quality')->nullable();
            $table->text('health_lifestyle_changes')->nullable();
            $table->text('diagnostic_tests')->nullable();
            $table->text('other_diagnosis_therapies')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_histories');
    }
};
