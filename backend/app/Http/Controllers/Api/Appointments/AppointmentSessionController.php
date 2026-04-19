<?php

namespace App\Http\Controllers\Api\Appointments;

use App\Http\Controllers\Controller;
use App\Services\Appointments\AppointmentSessionService;
use Illuminate\Http\Request;

class AppointmentSessionController extends Controller
{
    public function index(Request $request, AppointmentSessionService $service)
    {
        $patientId = $request->query('patient_id');

        $sessions = $service->list($request->user(), $patientId);

        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }

    public function store(Request $request)
    {
        //
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
