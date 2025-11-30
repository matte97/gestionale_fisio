<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientHistoryRequest extends FormRequest
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
            "patient_id" => ["required", "exists:patients,id"],

            "main_problem"               => ["nullable", "string"],
            "patient_goals"              => ["nullable", "string"],
            "onset"                      => ["nullable", "string"],
            "cause_of_onset"             => ["nullable", "string"],
            "onset_date"                 => ["nullable", "date", "before_or_equal:today"],
            "symptomps_relationship"     => ["nullable", "string"],
            "other_signs_symptomps"      => ["nullable", "string"],
            "phisical_activity"          => ["nullable", "string"],
            "sleep_quality"              => ["nullable", "string"],
            "health_lifestyle_changes"   => ["nullable", "string"],
            "diagnostic_tests"           => ["nullable", "string"],
            "other_diagnosis_therapies"  => ["nullable", "string"],

            "symptoms" => ["array"],
            "symptoms.*.type" => ["nullable", "string"],
            "symptoms.*.characteristic" => ["nullable", "string"],
            "symptoms.*.pattern" => ["nullable", "string"],
            "symptoms.*.intensityNprs" => ["nullable", "integer"],
            "symptoms.*.frequency" => ["nullable", "string"],
            "symptoms.*.betterWhen" => ["nullable", "string"],
            "symptoms.*.worseWhen" => ["nullable", "string"],
            "symptoms.*.trend" => ["nullable", "string"],
        ];
    }
}
