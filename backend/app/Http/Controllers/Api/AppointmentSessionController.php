<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AppointmentSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AppointmentSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $patientId = $request->query('patient_id');
        Log::info('userId', [$userId]);
Log::info('patientId', [$patientId]);


        $sessions = AppointmentSession::select([
            'appointment_sessions.id as id_sessione',
            'appointments.id as id_appuntamento',
        ])
            ->join('appointments', 'appointments.id', '=', 'appointment_sessions.appointment_id')
            ->where('appointments.patient_id', $patientId)
            ->where('appointments.user_id', $userId)
            ->get();

        Log::info($sessions) ;  

        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
