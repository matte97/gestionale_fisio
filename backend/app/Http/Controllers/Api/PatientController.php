<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Patients\StorePatientRequest;
use App\Http\Requests\Patients\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use App\Services\PatientService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, PatientService $service)
    {
        $patients = $service->list(
            $request->user(),
            $request->only('first_name')
        );

        return response()->json([
            'success' => true,
            'message' => 'Pazienti caricati con successo',
            'data' => PatientResource::collection($patients)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request, PatientService $service)
    {
        $user = $request->user();

        $validated = $request->validated();

        $patient = $service->create($user, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Paziente creato con successo',
            'data'    => new PatientResource($patient),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PatientService $service, string $id)
    {
        $user = $request->user();
        Log::info($user);
        $patient = $service->findById($user, $id);
        Log::info('Tipo di patient: ' . get_class($patient));
        
        if (!$patient) {
            return response()->json([
                'success' => false,
                'message' => 'Paziente non trovato o non autorizzato'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Paziente trovato con successo',
            'data'    => new PatientResource($patient)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, PatientService $service, string $id)
    {
        $validated = $request->validated();
        $user = $request->user();

        $patient = $service->update($user, $id, $validated);

        if (!$patient) {
            return response()->json([
                "success" => false,
                "message" => "Paziente non trovato o non autorizzato"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Paziente aggiornato con successo.",
            "data"    => new PatientResource($patient),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, PatientService $service, string $id)
    {
        $user = $request->user();

        $deleted = $service->delete($user,$id);

        if (!$deleted) {
            return response()->json([
                "success" => false,
                "message" => "Paziente non trovato o non autorizzato"
            ], 404);
        }
        
        return response()->json([
            "success" => true,
            "message" => "Paziente eliminato con successo."
        ]);
    }
}
