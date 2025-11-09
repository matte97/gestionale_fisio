<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required", "string", "min:6"]
        ]);

        $user = User::where("email", $validated["email"])->first();

        if (!$user || !Hash::check($validated["password"], $user->password)) {
            throw ValidationException::withMessages([
                "email" => "Credenziali non valide"
            ]);
        }

        $token = $user->createToken("auth_token")->plainTextToken;

        Log::info("Nuovo token creato per {$user->email}: {$token}");

        return response()->json([
            "user" => $user,
            "token" => $token,
            "token_type" => "bearer"
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        Log::info('Token grezzo:', [$token]);

        $personalToken = PersonalAccessToken::findToken($token);
        Log::info('Token trovato:', [$personalToken]);

        if ($personalToken) {
            $personalToken->delete();
            return response()->json([
                "message" => "Logout effettuato correttamente"
            ]);
        }

        return response()->json([
            "message" => "Token non trovato o già eliminato"
        ], 404);
    }
}
