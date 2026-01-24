<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConditionAssessment extends Model
{
    protected $fillable = [
        "anamnesis_id",
        "possible_sources",
        "mechanical_or_non_mechanical",
        "pain_type",
        "pain_mechanism",
        "severity",
        "irritability",
        "nature",
        "stage",
        "stability",
        "mobility_deficit_present",
        "mobility_deficit_notes",
        "neuromuscular_deficit_present",
        "neuromuscular_deficit_notes",
        "local_load_capacity_present",
        "local_load_capacity_notes",
        "global_load_capacity_present",
        "global_load_capacity_notes",
        "neural_mechanosensitivity_present",
        "neural_mechanosensitivity_notes",
        "hyperalgesia_or_allodynia_present",
        "hyperalgesia_or_allodynia_notes",
        "biological_factors",
        "psychological_factors",
        "social_factors",
        "positive_prognostic_factors",
        "negative_prognostic_factors",
        "contraindications",
        "precautions",
        "indications"
    ];

    public function anamnesis(){
        return $this->belongsTo(Anamnesis::class);
    }
}
