<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Log;

class AuthService
{
    public function login(array $credentials)
    {
        $user = User::where("email", $credentials["email"])->first();

        if (!$user || !Hash::check($credentials["password"], $user->password)) {
            throw ValidationException::withMessages([
                "email" => "Credenziali non valide"
            ]);
        }

        $token = $user->createToken("auth_token")->plainTextToken;
        Log::info("Nuovo token creato per {$user->email}: {$token}");

        return $token;
    }

    public function logout(?string $token)
    {
        Log::info('Token grezzo:', [$token]);

        if ($token) {
            $personalToken = PersonalAccessToken::findToken($token);
            Log::info('Token trovato:', [$personalToken]);

            if ($personalToken) {
                return $personalToken->delete();
            }
        }
        return false;
    }
}
