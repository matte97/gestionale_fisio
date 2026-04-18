<?php

namespace App\Http\Requests\Anamnesis;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnamnesisRequest extends FormRequest
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
            'anamnesi.patient_id' => 'required|exists:patients,id',
            'patientHistory' => 'nullable|array',
            'pastHistory' => 'nullable|array',
            'conditionAssesment' => 'nullable|array',
            'physicalExamination' => 'nullable|array',
            'physicalTherapyDiagnosis' => 'nullable|array',
        ];
    }
}
