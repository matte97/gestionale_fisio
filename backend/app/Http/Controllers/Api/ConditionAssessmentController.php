<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConditionAssessmentRequest;
use App\Services\ConditionAssessmentService;
use Illuminate\Http\Request;

class ConditionAssessmentController extends Controller
{
    public function index()
    {
        // Non implementato, recuperato in anamnesis load
    }

    public function store(ConditionAssessmentRequest $request, ConditionAssessmentService $service)
    {
        $conditionAssessment = $service->createOrUpdate($request->user(), $request->validated());

        return response()->json([
            "success" => true,
            "message" => "Categorie di ragionamento clinico pre-esame fisico creata con successo",
            "data" => $conditionAssessment
        ], 201);
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
