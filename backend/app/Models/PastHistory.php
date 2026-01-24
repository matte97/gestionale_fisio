<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PastHistory extends Model
{
    protected $fillable = [
        "user_id",
        "anamnesis_id",
        "patient_id",
        "other_medical_conditions",
        "similar_episodes_treatments_outcome",
        "medication_use",
        "physiological_history",
        "family_history"
    ];

    public function anamnesis(){
        return $this->belongsTo(Anamnesis::class);
    }

}
