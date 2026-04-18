<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class DashboardService
{
    public function getStats($user)
    {
        $cacheKey = "dashboard_stats_user_{$user->id}";

        // Memorizza i dati in cache per 15 minuti, le tag invalidano se ci sono update a pazienti o appointment
        return Cache::tags(["patients_{$user->id}", "appointments_{$user->id}"])->remember($cacheKey, 900, function () use ($user) {
            
            $total_patients = Patient::where("user_id", $user->id)->count();

            $total_appointments = Appointment::where("user_id", $user->id)->count();

            $appointments_today = Appointment::where("user_id", $user->id)
                ->whereDate("start_time", now()->toDateString())
                ->count();
            
            $patients_this_month = Patient::where("user_id", $user->id)
                ->whereMonth("created_at", now()->month)
                ->whereYear("created_at", now()->year)
                ->count();
            
            $new_patients_last_month = Patient::where("user_id", $user->id)
                ->whereMonth("created_at", now()->subMonth()->month)
                ->whereYear("created_at", now()->subMonth()->year)
                ->count();

            return [
                "total_appointments" => $total_appointments,
                "total_patients" => $total_patients,
                "today_appointments" => $appointments_today,
                "new_patients_this_month" => $patients_this_month, 
                "new_patients_last_month" => $new_patients_last_month,
                "patients_this_month" => $patients_this_month // Può riferirsi ai totali visitati, per ora mappo sui nuovi
            ];
        });
    }
}
