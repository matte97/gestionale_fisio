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
        Schema::create('physical_therapy_diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anamnesis_id')->constrained()->cascadeOnDelete();
            $table->text('possible_sources')->nullable();
            $table->text('mechanical_or_non_mechanical')->nullable();
            $table->text('pain_type')->nullable();
            $table->text('pain_mechanism')->nullable();
            $table->text('severity')->nullable();
            $table->text('irritability')->nullable();
            $table->text('nature')->nullable();
            $table->text('stage')->nullable();
            $table->text('stability')->nullable();
            $table->boolean('mobility_deficit_present')->default(false);
            $table->text('mobility_deficit_notes')->nullable();
            $table->boolean('neuromuscular_deficit_present')->default(false);
            $table->text('neuromuscular_deficit_notes')->nullable();
            $table->boolean('local_load_capacity_present')->default(false);
            $table->text('local_load_capacity_notes')->nullable();
            $table->boolean('global_load_capacity_present')->default(false);
            $table->text('global_load_capacity_notes')->nullable();
            $table->boolean('neural_mechanosensitivity_present')->default(false);
            $table->text('neural_mechanosensitivity_notes')->nullable();
            $table->boolean('hyperalgesia_or_allodynia_present')->default(false);
            $table->text('hyperalgesia_or_allodynia_notes')->nullable();
            $table->text('biological_factors')->nullable();
            $table->text('psychological_factors')->nullable();
            $table->text('social_factors')->nullable();
            $table->text('short_term_goals')->nullable();
            $table->text('medium_term_goals')->nullable();
            $table->text('long_term_goals')->nullable();
            $table->text('controindications')->nullable();
            $table->text('precautions')->nullable();
            $table->text('indications')->nullable();
            $table->text('test_treatment')->nullable();
            $table->text('treatment_dosage')->nullable();
            $table->text('session_schedule')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physical_therapy_diagnoses');
    }
};
