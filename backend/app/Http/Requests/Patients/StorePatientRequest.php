<?php

namespace App\Http\Requests\Patients;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
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
            'first_name'     => ['required', 'string', 'max:100'],
            'last_name'      => ['required', 'string', 'max:100'],
            'address'        => ['nullable', 'string'],
            'email'          => ['nullable', 'email'],
            'phone'          => ['nullable', 'string', 'max:15', 'regex:/^[0-9]+$/'],
            'birth_date'     => ['nullable', 'date'],
            'gender'         => ['nullable', 'string', 'max:10'],
            'occupation'     => ['nullable', 'string', 'max:30'],
            'sports_hobbies' => ['nullable', 'string', 'max:50'],
            'marital_status' => ['nullable', 'string', 'max:30'],
            'diagnosis'      => ['nullable', 'string', 'max:50'],
        ];
    }
}
