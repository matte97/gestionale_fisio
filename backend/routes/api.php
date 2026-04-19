<?php

use App\Http\Controllers\Api\Anamnesis\AnamnesisController;
use App\Http\Controllers\Api\Appointments\AppointmentController;
use App\Http\Controllers\Api\Appointments\AppointmentSessionController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\ConditionAssessment\ConditionAssessmentController as ApiConditionAssessmentController;
use App\Http\Controllers\Api\Dashboard\DashboardController as ApiDashboardController;
use App\Http\Controllers\Api\PastHistory\PastHistoryController;
use App\Http\Controllers\Api\Patients\PatientController;
use App\Http\Controllers\Api\PatientHistory\PatientHistoryController;
use App\Http\Controllers\Api\Therapies\TherapyController;
use Illuminate\Support\Facades\Route;

Route::post("/login", [AuthController::class, "login"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/me", [AuthController::class, "me"]);
    /*Routes per i pazienti*/
    Route::apiResource("/patients", PatientController::class);
    /*Routes per gli appuntamenti*/
    Route::apiResource("/appointments", AppointmentController::class);
    /*Routes per le sedute*/
    Route::apiResource("/appointments_sessions", AppointmentSessionController::class);
    /*Route per logout */
    Route::post("/logout", [AuthController::class, "logout"]);
    /*Route per dashboard */
    Route::get("/dashboard", [ApiDashboardController::class, "index"]);
    /*Route per terapie */
    Route::apiResource("/therapies", TherapyController::class);
    /*Route per la anamnesi*/
    Route::apiResource("/anamnesis", AnamnesisController::class);
    Route::get('/patients/{patient}/anamnesis', [AnamnesisController::class, 'indexForPatient']);
    /*Route per scheda anamnestica*/
    Route::apiResource("/patient_history", PatientHistoryController::class);
    /*Route per scheda anamnestica remota*/
    Route::apiResource("/past_history", PastHistoryController::class);
    /*Route per categorie di ragionamento*/
    Route::apiResource("/condition_assessments", ApiConditionAssessmentController::class);
});
