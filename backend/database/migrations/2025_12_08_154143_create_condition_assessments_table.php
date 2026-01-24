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
        Schema::create('condition_assessments', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->foreignId('anamnesis_id')->constrained('anamneses')->onDelete('cascade');

            $table->string('possible_sources')->nullable();
            $table->string('mechanical_or_non_mechanical')->nullable();
            $table->string('pain_type')->nullable();
            $table->string('pain_mechanism')->nullable();
            $table->string('severity')->nullable();
            $table->string('irritability')->nullable();
            $table->string('nature')->nullable();
            $table->string('stage')->nullable();
            $table->string('stability')->nullable();

            $table->boolean('mobility_deficit_present')->nullable();
            $table->string('mobility_deficit_notes')->nullable();
            $table->boolean('neuromuscular_deficit_present')->nullable();
            $table->string('neuromuscular_deficit_notes')->nullable();
            $table->boolean('local_load_capacity_present')->nullable();
            $table->string('local_load_capacity_notes')->nullable();
            $table->boolean('global_load_capacity_present')->nullable();
            $table->string('global_load_capacity_notes')->nullable();
            $table->boolean('neural_mechanosensitivity_present')->nullable();
            $table->string('neural_mechanosensitivity_notes')->nullable();
            $table->boolean('hyperalgesia_or_allodynia_present')->nullable();
            $table->string('hyperalgesia_or_allodynia_notes')->nullable();

            $table->text('biological_factors')->nullable();
            $table->text('psychological_factors')->nullable();
            $table->text('social_factors')->nullable();

            $table->text('positive_prognostic_factors')->nullable();
            $table->text('negative_prognostic_factors')->nullable();

            $table->text('contraindications')->nullable();
            $table->text('precautions')->nullable();
            $table->text('indications')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('condition_assessments');
    }
};
