<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\Auth\UserResource;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    public function login(LoginRequest $request, AuthService $service)
    {
        $token = $service->login($request->validated());

        return response()->json([
            "token" => $token,
            "token_type" => "bearer"
        ]);
    }

    public function logout(Request $request, AuthService $service)
    {
        $loggedOut = $service->logout($request->bearerToken());

        if ($loggedOut) {
            return response()->json([
                "message" => "Logout effettuato correttamente"
            ]);
        }

        return response()->json([
            "message" => "Token non trovato o già eliminato"
        ], 404);
    }
}
