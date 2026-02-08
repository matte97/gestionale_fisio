<?php

namespace App\Http\Requests\Appointments;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppointmentRequest extends FormRequest
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
            "patient_id" => ["sometimes", "required", "exists:patients,id"],
            "start_time" => ["sometimes", "required", "date"],
            "end_time"   => ["sometimes", "required", "date", "after:start_time"],
            "therapy_id" => ["sometimes", "required", "exists:therapies,id"],
            "status"     => ["sometimes", "string", "nullable"],
            "notes"      => ["sometimes", "string", "nullable"]
        ];
    }
}
