<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConditionAssessmentRequest;
use App\Models\ConditionAssessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConditionAssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ConditionAssessmentRequest $request)
    {
        $data = $request->validated();
        Log::info($data);
        $conditionAssessment = ConditionAssessment::create($data);

        return response()->json([
            "succes" => true,
            "message" => "Categorie di ragionamento clinico pre-esame fisico creata con successo",
            "data" => $conditionAssessment
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
