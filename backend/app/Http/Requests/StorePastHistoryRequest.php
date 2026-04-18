<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePastHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "anamnesis_id" => ["required", "exists:anamneses,id"],
            "other_medical_conditions" => ["string", "nullable"],
            "similar_episodes_treatments_outcome" => ["string", "nullable"],
            "medication_use" => ["string", "nullable"],
            "physiological_history" => ["string", "nullable"],
            "family_history" => ["string", "nullable"]
        ];
    }
}
