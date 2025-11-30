<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientSymptoms extends Model
{
    protected $fillable = [
        'type',
        'characteristic',
        'patient_history_id',
        'pattern',
        'intensity_nprs',
        'frequency',
        'better_when',
        'worse_when',
        'trend'
    ];

    public function PatientHistory(){
        return $this->belongsTo(PatientHistory::class);
    }
}
