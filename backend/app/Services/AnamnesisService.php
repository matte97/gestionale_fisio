<?php

namespace App\Services;

use App\Models\Anamnesis;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AnamnesisService
{
    public function createTree($user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {
            // 1. Creazione record base Anamnesis
            $anamnesis = Anamnesis::create([
                "user_id" => $user->id,
                "patient_id" => $data['anamnesi']['patient_id']
            ]);

            // 2. Patient History (Anamnesi Prossima)
            if (!empty($data['patientHistory'])) {
                $anamnesis->patient_history()->create($data['patientHistory']);
            }

            // 3. Past History (Anamnesi Remota)
            if (!empty($data['pastHistory'])) {
                $anamnesis->past_history()->create(array_merge(
                    $data['pastHistory'],
                    ["user_id" => $user->id, "patient_id" => $data['anamnesi']['patient_id']]
                ));
            }

            // 4. Condition Assessment
            if (!empty($data['conditionAssesment'])) {
                $anamnesis->condition_assessment()->create($data['conditionAssesment']);
            }

            // 5. Physical Examination
            if (!empty($data['physicalExamination'])) {
                $examData = $data['physicalExamination'];
                if (isset($examData["active_movements_region"]) && is_array($examData["active_movements_region"])) {
                    $examData["active_movements_region"] = json_encode($examData["active_movements_region"]);
                }
                if (isset($examData["passive_movements_region"]) && is_array($examData["passive_movements_region"])) {
                    $examData["passive_movements_region"] = json_encode($examData["passive_movements_region"]);
                }
                if (isset($examData["accessory_passive_movements_region"]) && is_array($examData["accessory_passive_movements_region"])) {
                    $examData["accessory_passive_movements_region"] = json_encode($examData["accessory_passive_movements_region"]);
                }
                $anamnesis->physical_examination()->create($examData);
            }

            // 6. Physical Therapy Diagnosis
            if (!empty($data['physicalTherapyDiagnosis'])) {
                $anamnesis->physical_therapy_diagnosis()->create($data['physicalTherapyDiagnosis']);
            }

            $anamnesis->load([
                'patient_history', 'past_history', 'condition_assessment', 
                'physical_examination', 'physical_therapy_diagnosis'
            ]);

            // Flush cache pazienti per aggiornare la vista record
            \Illuminate\Support\Facades\Cache::tags(["patients_{$user->id}"])->flush();

            return $anamnesis;
        });
    }
}
