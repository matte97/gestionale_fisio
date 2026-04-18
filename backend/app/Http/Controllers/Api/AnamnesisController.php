<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Anamnesis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AnamnesisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexForPatient($patient_id, Request $request)
    {
        $user = $request->user();

        $anamnesis = Anamnesis::select("id")
            ->where("user_id", $user->id)
            ->where("patient_id", $patient_id)
            ->get();

        return response()->json([
            "success" => true,
            "data" => $anamnesis
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'anamnesi.patient_id' => 'required|exists:patients,id',
            'patientHistory' => 'nullable|array',
            'pastHistory' => 'nullable|array',
            'conditionAssesment' => 'nullable|array',
            'physicalExamination' => 'nullable|array',
            'physicalTherapyDiagnosis' => 'nullable|array',
        ]);

        $user = $request->user();

        try {
            $anamnesis = \Illuminate\Support\Facades\DB::transaction(function () use ($user, $request) {
                // 1. Creazione record base Anamnesis
                $anamnesis = Anamnesis::create([
                    "user_id" => $user->id,
                    "patient_id" => $request->input("anamnesi.patient_id")
                ]);

                // 2. Patient History (Anamnesi Prossima)
                if ($request->has("patientHistory") && !empty($request->input("patientHistory"))) {
                    $anamnesis->patient_history()->create($request->input("patientHistory"));
                }

                // 3. Past History (Anamnesi Remota)
                if ($request->has("pastHistory") && !empty($request->input("pastHistory"))) {
                    $anamnesis->past_history()->create(array_merge(
                        $request->input("pastHistory"),
                        ["user_id" => $user->id, "patient_id" => $request->input("anamnesi.patient_id")]
                    ));
                }

                // 4. Condition Assessment
                if ($request->has("conditionAssesment") && !empty($request->input("conditionAssesment"))) {
                    $anamnesis->condition_assessment()->create($request->input("conditionAssesment"));
                }

                // 5. Physical Examination
                if ($request->has("physicalExamination") && !empty($request->input("physicalExamination"))) {
                    $examData = $request->input("physicalExamination");
                    // Ensure JSON fields are cast correctly if passed as arrays from frontend
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
                if ($request->has("physicalTherapyDiagnosis") && !empty($request->input("physicalTherapyDiagnosis"))) {
                    $anamnesis->physical_therapy_diagnosis()->create($request->input("physicalTherapyDiagnosis"));
                }

                return $anamnesis->load([
                    'patient_history', 'past_history', 'condition_assessment', 
                    'physical_examination', 'physical_therapy_diagnosis'
                ]);
            });

            return response()->json([
                "success" => true,
                "message" => "Scheda anamnestica creata con successo in modo definitivo.",
                "data" => $anamnesis
            ], 201);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Errore Salvataggio Anamnesi Wizard: " . $e->getMessage());
            return response()->json([
                "success" => false,
                "message" => "Errore durante il salvataggio: " . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
