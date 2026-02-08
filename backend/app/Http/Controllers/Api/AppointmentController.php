<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Appointments\StoreAppointmentRequest;
use App\Http\Requests\Appointments\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\AppointmentSession;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, AppointmentService $service, $patientId)
    {
        $patientId = $request->query("patient_id");
        $appointments = $service->list($request->user(),$patientId);

        return response()->json([
            "success" => true,
            "message" => "Appuntamenti caricati con successo",
            "data"    => AppointmentResource::collection($appointments)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppointmentRequest $request, AppointmentService $service)
    {
        $user = $request->user();
        $patient = $request->query("patient_id");
        $validated = $request->validated();

        $appointment = $service->create($user, $patient, $validated);

        return response()->json([
            "success" => true,
            "message" => "Appuntamento creato con successo",
            "data"    => AppointmentResource::collection($appointment)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id, AppointmentService $service)
    {
        $user = $request->user();
        $patient = $request->query("patient_id");
        $appointment = $service->findById($user->id,$id,$patient);
        if (!$appointment) {
            return response()->json([
                "success" => false,
                "message" => "Appuntamento non trovato o non autorizzato"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Appuntamento trovato con successo",
            "data"    => AppointmentResource::collection($appointment)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, string $id, AppointmentService $service)
    {
        $user = $request->user();

        $validated = $request->validated();

        $appointment = $service->update($user, $id, $validated);

        if (!$appointment) {
            return response()->json([
                "success" => false,
                "message" => "Appuntamento non trovato o non autorizzato."
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Appuntamento aggiornato con successo",
            "data"    => AppointmentResource::collection($appointment)
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id, AppointmentService $service)
    {
        $user = $request->user();
        $patient = $request->query("patient_id");
        $appointment = $service->delete($user,$id,$patient);

        if (!$appointment) {
            return response()->json([
                "success" => false,
                "data" => "Appuntamento non trovato o non autorizzato."
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Appuntamento cancellato con successo."
        ]);
    }
}
