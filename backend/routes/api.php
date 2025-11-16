<?php

use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\api\TherapyController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login",[AuthController::class,"login"]);

Route::middleware("auth:sanctum")->group(function (){
    /*Routes per i pazienti*/
    Route::apiResource("/patients",PatientController::class);
    /*Routes per gli appuntamenti*/
    Route::apiResource("/appointments",AppointmentController::class);
    /*Route per logout */
    Route::post("/logout",[AuthController::class,"logout"]);
    /*Route per dashboard */
    Route::get("/dashboard",[DashboardController::class,"index"]);
    /*Route per terapie */
    Route::apiResource("/therapies",TherapyController::class);
});
