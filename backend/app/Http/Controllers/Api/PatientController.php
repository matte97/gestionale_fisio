<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $filters = $request->only(['first_name']);

        $query = Patient::select(
            "patients.id as patient_id",
            "patients.first_name",
            "patients.last_name",
            "patients.birth_date",
            "patients.email",
            "patients.user_id",
            "patients.phone",
            "patients.gender"
        )
            ->where("patients.user_id", $user->id)
            ->filter($filters)
            ->orderBy("last_name")
            ->orderBy("id");

        $patients = $query->cursorPaginate(10);

        return response()->json([
            "success" => true,
            "data" => $patients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            "first_name" => ["required", "string", "max:100"],
            "last_name" => ["required", "string", "max:100"],
            "address" => ["nullable", "string"],
            "email" => ["nullable", "email"],
            "phone" => ["nullable", "string", "max:15"],
            "birth_date" => ["nullable", "date"],
            "gender" => ["nullable", "string", "max:10"]
        ]);

        $patient = Patient::create([
            "first_name" => $validated["first_name"],
            "last_name" => $validated["last_name"],
            "address" => $validated["address"],
            "email" => $validated["email"],
            "phone" => $validated["phone"],
            "birth_date" => $validated["birth_date"],
            "gender" => $validated["gender"],
            "user_id" => $user->id
        ]);

        return response()->json([
            "success" => true,
            "message" => "Paziente creato con successo",
            "data" => $patient
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $patient = Patient::where("user_id", $user->id)->find($id);

        if (!$patient) {
            return response()->json([
                "success" => false,
                "message" => "Paziente non trovato o non autorizzato"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $patient
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            "first_name" => ["required", "string", "max:100"],
            "last_name" => ["required", "string", "max:100"],
            "address" => ["nullable", "string"],
            "email" => ["nullable", "email"],
            "phone" => ["nullable", "string", "max:15"],
            "birth_date" => ["nullable", "date"],
            "gender" => ["nullable", "string", "max:10"]
        ]);

        $user = $request->user();

        $patient = Patient::where("user_id", $user->id)->find($id);

        if (!$patient) {
            return response()->json([
                "success" => false,
                "message" => "Paziente non trovato o non autorizzato"
            ], 404);
        }

        $patient->update($validated);

        return response()->json([
            "success" => true,
            "message" => "Paziente aggiornato con successo.",
            "data" => $patient
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        $patient = Patient::where("user_id", $user->id)->find($id);

        if (!$patient) {
            return response()->json([
                "success" => false,
                "message" => "Paziente non trovato o non autorizzato"
            ], 404);
        }

        $patient->delete();

        return response()->json([
            "success" => true,
            "message" => "Paziente eliminato con successo."
        ]);
    }
}
