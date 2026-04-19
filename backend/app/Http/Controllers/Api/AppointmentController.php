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

    public function index(Request $request, AppointmentService $service)
    {
        $patientId = $request->query("patient_id");
        $appointments = $service->list($request->user(),$patientId);

        return response()->json([
            "success" => true,
            "message" => "Appuntamenti caricati con successo",
            "data"    => AppointmentResource::collection($appointments)
        ]);
    }


    public function store(StoreAppointmentRequest $request, AppointmentService $service)
    {
        $user = $request->user();
        $patient = $request->query("patient_id");
        $validated = $request->validated();

        $appointment = $service->create($user, $patient, $validated);

        return response()->json([
            "success" => true,
            "message" => "Appuntamento creato con successo",
            "data"    => new AppointmentResource($appointment)
        ], 201);
    }


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
            "data"    => new AppointmentResource($appointment)
        ]);
    }


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
            "data"    => new AppointmentResource($appointment)
        ], 201);
    }


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
