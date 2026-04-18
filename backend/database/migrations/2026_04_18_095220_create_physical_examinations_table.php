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
        Schema::create('physical_examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anamnesis_id')->constrained()->cascadeOnDelete();
            $table->text('baseline_symptoms')->nullable();
            $table->boolean('symptom_postural_correlations')->default(false);
            $table->text('local_correlation')->nullable();
            $table->text('regional_correlation')->nullable();
            $table->text('global_correlation')->nullable();
            $table->text('red_flag')->nullable();
            $table->text('neurological_function')->nullable();
            $table->boolean('neurological_exam_necessary')->default(false);
            $table->text('mechanosensitivity')->nullable();
            $table->text('provocative_relieving_movements')->nullable();
            $table->jsonb('active_movements_region')->nullable();
            $table->jsonb('passive_movements_region')->nullable();
            $table->jsonb('accessory_passive_movements_region')->nullable();
            $table->text('neuromuscular_strength')->nullable();
            $table->text('neuromuscular_endurance')->nullable();
            $table->text('neuromuscular_motor_control')->nullable();
            $table->text('neuromuscular_power')->nullable();
            $table->text('special_test')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physical_examinations');
    }
};
