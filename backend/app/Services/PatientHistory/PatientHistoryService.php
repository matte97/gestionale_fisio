<?php

namespace App\Services\PatientHistory;

use App\Models\PatientHistory;
use Illuminate\Support\Facades\DB;

class PatientHistoryService
{
    public function createOrUpdate($user, array $data)
    {
        return DB::transaction(function () use ($data) {
            $patientHistory = PatientHistory::updateOrCreate(
                ['anamnesis_id' => $data["anamnesis_id"]],
                collect($data)->except('symptoms')->toArray()
            );

            if (isset($data['symptoms']) && is_array($data['symptoms'])) {
                $patientHistory->symptoms()->delete();
                foreach($data["symptoms"] as $symptom){
                    $patientHistory->symptoms()->create($symptom);
                }
            }

            return $patientHistory->load('symptoms');
        });
    }

    public function findByAnamnesis($id)
    {
        return PatientHistory::where("anamnesis_id", $id)
            ->with("symptoms")
            ->first();
    }
}
