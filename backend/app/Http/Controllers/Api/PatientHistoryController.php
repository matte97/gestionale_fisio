<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientHistoryRequest;
use App\Models\PatientHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PatientHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientHistoryRequest $request)
    {
        $validate = $request->validated();
        $patientHistory = PatientHistory::create([
            "anamnesis_id" => $validate["anamnesis_id"],
            "main_problem" => $validate["main_problem"],
            "patient_goals" => $validate["patient_goals"],
            "onset" => $validate["onset"],
            "cause_of_onset" => $validate["cause_of_onset"],
            "onset_date" => $validate["onset_date"],
            "symptomps_relationship" => $validate["symptomps_relationship"],
            "other_signs_symptomps" => $validate["other_signs_symptomps"],
            "phisical_activity" => $validate["phisical_activity"],
            "sleep_quality" => $validate["sleep_quality"],
            "health_lifestyle_changes" => $validate["health_lifestyle_changes"],
            "diagnostic_tests" => $validate["diagnostic_tests"],
            "other_diagnosis_therapies" => $validate["other_diagnosis_therapies"]
        ]);

        foreach($validate["symptoms"] as $symptom){
            $patientHistory->symptoms()->create($symptom);
        }

        $patientHistory->load('symptoms');

        return response()->json([
            "succes" => true,
            "message" => "Scheda anamnestica creata con successo",
            "data" => $patientHistory
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $patientHistory = PatientHistory::where("anamnesis_id", $id)
            ->with("symptoms")
            ->first();

        if (!$patientHistory) {
            return response()->json([
                "success" => false,
                "message" => "Scheda paziente non trovata o non autorizzato"
            ], 404);
        }        

       $patientHistory->load("symptoms");

       Log::info($patientHistory);

        return response()->json([
            "success" => true,
            "data" => $patientHistory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PatientHistory $patientHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PatientHistory $patientHistory)
    {
        //
    }
}
