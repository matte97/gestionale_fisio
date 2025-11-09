<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login",[AuthController::class,"login"]);

Route::middleware("auth:sanctum")->group(function (){
    Route::apiResource("/patients",PatientController::class);
});
