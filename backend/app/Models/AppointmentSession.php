<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentSession extends Model
{
    protected $fillable = [
        "appointment_id",
        "notes"
    ];

    public function appointment(){
        return $this->belongsTo(Appointment::class);
    }
}
