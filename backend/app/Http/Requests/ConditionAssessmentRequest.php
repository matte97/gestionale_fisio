<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConditionAssessmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "anamnesis_id" =>  ["required", "exists:anamneses,id"],
            "possible_sources" => ["string", "nullable"],
            "mechanical_or_non_mechanical" => ["string", "nullable"],
            "pain_type" => ["string", "nullable"],
            "pain_mechanism" => ["string", "nullable"],
            "severity" => ["string", "nullable"],
            "nature" => ["string", "nullable"],
            "stage" => ["string", "nullable"],
            "stability" => ["string", "nullable"],
            "mobility_deficit_present" => ["boolean", "nullable"],
            "mobility_deficit_notes" => ["string", "nullable"],
            "neuromuscular_deficit_present" => ["boolean", "nullable"],
            "neuromuscular_deficit_notes" => ["string", "nullable"],
            "local_load_capacity_present" => ["boolean", "nullable"],
            "local_load_capacity_notes" => ["string", "nullable"],
            "global_load_capacity_present" => ["boolean", "nullable"],
            "global_load_capacity_notes" => ["string", "nullable"],
            "neural_mechanosensitivity_present" => ["boolean", "nullable"],
            "neural_mechanosensitivity_notes" => ["string", "nullable"],
            "hyperalgesia_or_allodynia_present" => ["boolean", "nullable"],
            "hyperalgesia_or_allodynia_notes" => ["string", "nullable"],
            "biological_factors" => ["string", "nullable"],
            "psychological_factors" => ["string", "nullable"],
            "social_factors" => ["string", "nullable"],
            "positive_prognostic_factors" => ["string", "nullable"],
            "negative_prognostic_factors" => ["string", "nullable"],
            "contraindications" => ["string", "nullable"],
            "precautions" => ["string", "nullable"],
            "indications" => ["string", "nullable"]
        ];
    }
}
