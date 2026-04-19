<?php

namespace App\Http\Controllers\Api\Therapies;

use App\Http\Controllers\Controller;
use App\Http\Requests\Therapies\StoreTherapyRequest;
use App\Http\Resources\Therapies\TherapyResource;
use App\Services\Therapies\TherapyService;
use Illuminate\Http\Request;

class TherapyController extends Controller
{
    public function index(Request $request, TherapyService $service)
    {
        $therapies = $service->list($request->user());

        return TherapyResource::collection($therapies)->additional(['success' => true]);
    }

    public function store(StoreTherapyRequest $request, TherapyService $service)
    {
        $therapy = $service->create($request->user(), $request->validated());

        return response()->json([
            "success" => true,
            "message" => "Terapia creata con successo",
            "data" => new TherapyResource($therapy)
        ], 201);
    }

    public function show(Request $request, string $id, TherapyService $service)
    {
        $therapy = $service->findById($request->user(), $id);

        if (!$therapy) {
            return response()->json([
                "success" => false,
                "message" => "Terapia non trovata o non autorizzata"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => new TherapyResource($therapy)
        ]);
    }

    public function update(StoreTherapyRequest $request, string $id, TherapyService $service)
    {
        $therapy = $service->update($request->user(), $id, $request->validated());

        if (!$therapy) {
            return response()->json([
                "success" => false,
                "message" => "Terapia non trovata o non autorizzata"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Terapia aggiornata con successo",
            "data" => new TherapyResource($therapy)
        ]);
    }

    public function destroy(Request $request, string $id, TherapyService $service)
    {
        $deleted = $service->delete($request->user(), $id);

        if (!$deleted) {
            return response()->json([
                "success" => false,
                "message" => "Terapia non trovata o non autorizzata"
            ], 404);
        }

        return response()->json([
                "success" => true,
                "message" => "Terapia eliminata con successo"
            ]);
    }
}
