<?php

namespace App\Http\Controllers\Api\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\Patients\StorePatientRequest;
use App\Http\Requests\Patients\UpdatePatientRequest;
use App\Http\Resources\Patients\PatientResource;
use App\Models\Patient;
use App\Services\Patients\PatientService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PatientController extends Controller
{

    public function index(Request $request, PatientService $service)
    {
        $patients = $service->list(
            $request->user(),
            $request->only(['search', 'first_name', 'last_name', 'gender', 'diagnosis', 'birth_year'])
        );

        return PatientResource::collection($patients)->additional(['success' => true]);
    }


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
