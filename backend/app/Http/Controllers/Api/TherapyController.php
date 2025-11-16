<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Therapy;
use Illuminate\Http\Request;

class TherapyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $therapies = Therapy::select('id', 'name', 'color')->where('user_id', $user->id)->get();

        return response()->json([
            "success" => true,
            "data" => $therapies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            "name" => ["required", "string"],
            "color" => ["string"]
        ]);

        $therapy = Therapy::create([
            "user_id" => $user->id,
            "name" => $validated["name"],
            "color" => $validated["color"]
        ]);

        return response()->json([
            "success" => true,
            "message" => "Terapia creata con successo",
            "data" => $therapy
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $therapy = Therapy::select('id', 'name', 'color')->where('user_id', $user->id)->find($id);

        if (!$therapy) {
            return response()->json([
                "success" => false,
                "message" => "Paziente non trovato o non autorizzato"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $therapy
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        $validated = $request->validate([
            "name" => ["required", "string"],
            "color" => ["string"]
        ]);

        $therapy = Therapy::where("user_id", $user->id)->find($id);

        if (!$therapy) {
            return response()->json([
                "success" => false,
                "message" => "Terapia non trovata o non autorizzato",
                "data" => $therapy
            ], 404);
        }

        $therapy->update($validated);

        return response()->json([
            "success" => true,
            "message" => "Terapia aggiornata con successo",
            "data" => $therapy
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        $therapy = Therapy::where("user_id", $user->id)->find($id);

        if (!$therapy) {
            return response()->json([
                "success" => false,
                "message" => "Terapia non trovata o non autorizzato",
                "data" => $therapy
            ], 404);
        }

        $therapy->delete();

        return response()->json([
                "success" => true,
                "message" => "Terapia eliminata con successo",
                "data" => $therapy
            ], 201);
    }
}
