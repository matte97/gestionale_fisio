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
        $this->belongsTo(User::class);
    }

    public function patient(){
        $this->belongsTo(Patient::class);
    }

    public function patient_history(){
        $this->hasOne(PatientHistory::class);
    }

    public function past_history(){
        $this->hasOne(PastHistory::class);
    }

    public function condition_assessment(){
        $this->hasOne(ConditionAssessment::class);
    }
}
