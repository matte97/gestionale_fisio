<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $appointments = Appointment::where("user_id", $user->id)
            ->orderBy("start_time")
            ->get();

        return response()->json([
            "success" => true,
            "data" => $appointments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            "patient_id" => ["required", "exists:patients,id"],
            "start_time" => ["required", "date"],
            "end_time" => ["required", "date", "after:start_time"],
            "therapy_type" => ["string"],
            "status" => ["string"],
            "notes" => ["string"]
        ]);

        $appointment = Appointment::create([
            "user_id" => $user->id,
            "patient_id" => $validated["patient_id"],
            "start_time" => $validated["start_time"],
            "end_time" => $validated["end_time"],
            "therapy_type" => $validated["therapy_type"],
            "status" => $validated["status"],
            "notes" => $validated["notes"]
        ]);

        return response()->json([
            "success" => true,
            "message" => "Appuntamento creato con successo",
            "data" => $appointment
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $appointment = Appointment::where("user_id", $user->id)->find($id);

        if (!$appointment) {
            return response()->json([
                "success" => false,
                "data" => "Appuntamento non trovato o non autorizzato"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $appointment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        $validated = $request->validate([
            "patient_id" => ["required"],
            "start_time" => ["required", "date"],
            "end_time" => ["required", "date", "after:start_time"],
            "therapy_type" => ["string"],
            "status" => ["string", "in:scheduled,completed,cancelled"],
            "notes" => ["string"]
        ]);

        $appointment = Appointment::where('user_id', $user->id)->find($id);

        if (!$appointment) {
            return response()->json([
                "success" => false,
                "message" => "Appuntamento non trovato o non autorizzato."
            ], 404);
        }

        $appointment->update($validated);

        return response()->json([
            "success" => true,
            "message" => "Appuntamento aggiornato con successo",
            "data" => $appointment
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        $appointment = Appointment::where("user_id", $user->id)->find($id);

        if (!$appointment) {
            return response()->json([
                "success" => false,
                "data" => "Appuntamento non trovato o non autorizzato."
            ], 404);
        }

        $appointment->delete();

        return response()->json([
            "success" => true,
            "message" => "Appuntamento cancellato con successo."
        ]);
    }
}
