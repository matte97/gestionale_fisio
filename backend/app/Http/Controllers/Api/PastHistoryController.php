<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PastHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PastHistoryController extends Controller
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
    public function store(Request $request)
    {
        $user = $request->user();

        $validate = $request->validate([
            "anamnesis_id" => ["required", "exists:anamneses,id"],
            "other_medical_conditions" => ["string"],
            "similar_episodes_treatments_outcome" => ["string"],
            "medication_use" => ["string"],
            "physiological_history" => ["string"],
            "family_history" => ["string"]
        ]);
        Log::info($validate["anamnesis_id"]);
        $pastHistory = PastHistory::create([
            "anamnesis_id" => $validate["anamnesis_id"],
            "other_medical_conditions" => $validate["other_medical_conditions"],
            "similar_episodes_treatments_outcome" => $validate["similar_episodes_treatments_outcome"],
            "medication_use" => $validate["medication_use"],
            "physiological_history" => $validate["physiological_history"],
            "family_history" => $validate["family_history"]
        ]);

        return response()->json([
            "success" => true,
            "message" => "Scheda anamnestica remota creata con succcesso.",
            "data" => $pastHistory
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PastHistory $pastHistory)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PastHistory $pastHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PastHistory $pastHistory)
    {
        //
    }
}
