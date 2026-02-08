<?php

namespace App\Http\Requests\Patients;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
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
            'first_name'     => ['sometimes', 'required', 'string', 'max:100'],
            'last_name'      => ['sometimes', 'required', 'string', 'max:100'],
            'address'        => ['sometimes', 'nullable', 'string'],
            'email'          => ['sometimes', 'nullable', 'email'],
            'phone'          => ['sometimes', 'nullable', 'string', 'max:15'],
            'birth_date'     => ['sometimes', 'nullable', 'date'],
            'gender'         => ['sometimes', 'nullable', 'string', 'max:10'],
            'occupation'     => ['sometimes', 'nullable', 'string', 'max:30'],
            'sports_hobbies' => ['sometimes', 'nullable', 'string', 'max:50'],
            'marital_status' => ['sometimes', 'nullable', 'string', 'max:30'],
            'diagnosis'      => ['sometimes', 'nullable', 'string', 'max:50'],
        ];
    }
}
