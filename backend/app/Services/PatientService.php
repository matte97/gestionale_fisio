<?php

namespace App\Services;

use App\Models\Anamnesis;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

class PatientService
{
    public function list($user, array $filters)
    {
        return Patient::where("user_id", $user->id)
            ->with("anamnesis")
            ->filter($filters)
            ->orderBy("last_name")
            ->orderBy("id")
            ->cursorPaginate(10);
    }

    public function create($user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {
            $data['user_id'] = $user->id;

            $patient = Patient::create($data);

            Anamnesis::create([
                "user_id" => $user->id,
                "patient_id" => $patient->id
            ]);

            return $patient;
        });
    }

    public function update($user, string $id, array $data)
    {
        $patient = Patient::where("user_id", $user->id)->find($id);

        if (!$patient) {
            return null;
        }

        $patient->update($data);

        return $patient;
    }

    public function findById($user, string $id)
    {
        return Patient::where('user_id', $user->id)
            ->with('anamnesis')
            ->first();
    }

    public function delete($user, string $id) 
    {
        $patient = Patient::where("user_id", $user->id)->find($id);

        if(!$patient){
            return false;
        }

        return (bool) $patient->delete();
    }
}
