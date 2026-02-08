<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\AppointmentSession;
use Illuminate\Support\Facades\DB;

class AppointmentService
{
    public function list($user, $patientId)
    {
        return Appointment::where("user_id", $user->id)
            ->where("patient_id", $patientId)
            ->orderby("start_time")
            ->get();
    }

    public function create($user, $patient, array $data)
    {
        return DB::transaction(function () use ($user, $patient, $data) {
            $data["patient_id"] = $patient;
            $data["user_id"] = $user->id;

            $appointment = Appointment::create($data);

            AppointmentSession::create([
                "appointment_id" => $appointment->id,
            ]);

            return $appointment;
        });
    }

    public function update($user, string $id, array $data)
    {
        $appointment = Appointment::where("user_id", $user->id)->find($id);

        if (!$appointment) {
            return null;
        }

        $appointment->update($data);

        return $appointment;
    }

    public function findById($user, string $id, $patient)
    {
        return Appointment::where('user_id', $user->id)
            ->where("patient_id", $patient)
            ->find($id);
    }

    public function delete($user, string $id, $patient)
    {
        $appointment = Appointment::where("user_id", $user->id)
            ->where("patient_id", $patient)
            ->find($id);

        if (!$appointment) {
            return null;
        }

        return (bool) $appointment->delete();
    }
}
