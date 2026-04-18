<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePastHistoryRequest;
use App\Services\PastHistoryService;
use Illuminate\Http\Request;

class PastHistoryController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StorePastHistoryRequest $request, PastHistoryService $service)
    {
        $pastHistory = $service->createOrUpdate($request->user(), $request->validated());

        return response()->json([
            "success" => true,
            "message" => "Scheda anamnestica remota creata con succcesso.",
            "data" => $pastHistory
        ], 201);
    }

    public function show(Request $request, string $id)
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
