<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anamnesis extends Model
{
    protected $fillable = [
        "user_id",
        "patient_id"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function patient(){
        return $this->belongsTo(Patient::class);
    }

    public function patient_history(){
        return $this->hasOne(PatientHistory::class);
    }

    public function past_history(){
        return $this->hasOne(PastHistory::class);
    }

    public function condition_assessment(){
        return $this->hasOne(ConditionAssessment::class);
    }
    public function physical_examination(){
        return $this->hasOne(PhysicalExamination::class);
    }

    public function physical_therapy_diagnosis(){
        return $this->hasOne(PhysicalTherapyDiagnosis::class);
    }
}
