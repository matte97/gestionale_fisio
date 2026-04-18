<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhysicalTherapyDiagnosis extends Model
{
    protected $guarded = [];

    public function anamnesis(){
        return $this->belongsTo(Anamnesis::class);
    }
}
