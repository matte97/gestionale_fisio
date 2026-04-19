<?php

namespace App\Services;

use App\Models\AppointmentSession;

class AppointmentSessionService
{
    public function list($user, $patientId)
    {
        return AppointmentSession::select([
            'appointment_sessions.id as id_sessione',
            'appointments.id as id_appuntamento',
        ])
            ->join('appointments', 'appointments.id', '=', 'appointment_sessions.appointment_id')
            ->where('appointments.patient_id', $patientId)
            ->where('appointments.user_id', $user->id)
            ->get();
    }
}
