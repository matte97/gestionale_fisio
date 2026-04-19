<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Anamnesis\StoreAnamnesisRequest;
use App\Models\Anamnesis;
use App\Services\AnamnesisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AnamnesisController extends Controller
{
    public function indexForPatient($patient, Request $request)
    {
        $user = $request->user();

        $anamnesis = Anamnesis::where("user_id", $user->id)
            ->where("patient_id", $patient)
            ->orderBy('created_at', 'desc')
            ->get(['id', 'created_at']);

        return response()->json([
            "success" => true,
            "data" => $anamnesis
        ]);
    }

    public function store(StoreAnamnesisRequest $request, AnamnesisService $service)
    {
        try {
            $anamnesis = $service->createTree($request->user(), $request->validated());

            return response()->json([
                "success" => true,
                "message" => "Scheda anamnestica creata con successo in modo definitivo.",
                "data" => $anamnesis
            ], 201);

        } catch (\Exception $e) {
            Log::error("Errore Salvataggio Anamnesi Wizard: " . $e->getMessage());
            return response()->json([
                "success" => false,
                "message" => "Errore durante il salvataggio: " . $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
