<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientHistoryRequest;
use App\Services\PatientHistoryService;
use Illuminate\Http\Request;

class PatientHistoryController extends Controller
{
    public function index()
    {
        // Viewable via anamnesis resource
    }

    public function store(StorePatientHistoryRequest $request, PatientHistoryService $service)
    {
        $patientHistory = $service->createOrUpdate($request->user(), $request->validated());

        return response()->json([
            "success" => true,
            "message" => "Scheda anamnestica creata con successo",
            "data" => $patientHistory
        ], 201);
    }

    public function show(Request $request, string $id, PatientHistoryService $service)
    {
        $patientHistory = $service->findByAnamnesis($id);

        if (!$patientHistory) {
            return response()->json([
                "success" => false,
                "message" => "Scheda paziente non trovata o non autorizzato"
            ], 404);
        }        

        return response()->json([
            "success" => true,
            "data" => $patientHistory
        ]);
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
