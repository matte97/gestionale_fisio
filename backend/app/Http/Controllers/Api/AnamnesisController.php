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
            'patient_id' => 'required|exists:patients,id',
        ]);
        $user = $request->user();

        $anamnesis = Anamnesis::create([
            "user_id" => $user->id,
            "patient_id" => $validate["patient_id"]
        ]);

        return response()->json([
            "success" => true,
            "message" => "Scheda anamnestica creata con successo",
            "data" => $anamnesis
        ], 201);
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
