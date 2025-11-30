<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request){

        $user = $request->user();

        $total_patients = Patient::where("user_id",$user->id)->count();

        $appointments_today = Appointment::where("user_id", $user->id)
                                ->whereDate("start_time",now()->toDateString())
                                ->count();
        
        $total_appointments = Appointment::where("user_id",$user->id)->count();

        return response()->json([
            "total_appointments" => $total_appointments,
            "total_patients" => $total_patients,
            "today_appointment" => $appointments_today
        ]);
    }
}
