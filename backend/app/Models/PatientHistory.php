<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientHistory extends Model
{
    protected $fillable = [
        "user_id",
        "patient_id",
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

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function patient(){
        return $this->belongsTo(Patient::class);
    }

    public function symptoms(){
        return $this->hasMany(PatientSymptoms::class);
    }
}
