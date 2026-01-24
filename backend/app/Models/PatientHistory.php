<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientHistory extends Model
{
    protected $fillable = [
        "anamnesis_id",
        "main_problem",
        "patient_goals",
        "onset",
        "cause_of_onset",
        "onset_date",
        "symptoms_relationship",
        "other_signs_symptomps",
        "phisical_activity",
        "sleep_quality",
        "health_lifestyle_changes",
        "diagnostic_tests",
        "other_diagnosis_therapies"
    ];

    public function anamnesis(){
        return $this->belongsTo(Anamnesis::class);
    }

    public function symptoms(){
        return $this->hasMany(PatientSymptoms::class);
    }
}
