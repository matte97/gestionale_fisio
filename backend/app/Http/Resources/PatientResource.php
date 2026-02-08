<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'patient_id'     => $this->id,
            'first_name'     => $this->first_name,
            'last_name'      => $this->last_name,
            'address'        => $this->address,
            'birth_date'     => $this->birth_date,
            'email'          => $this->email,
            'phone'          => $this->phone,
            'gender'         => $this->gender,
            'anamnesis_id'   => $this->anamnesis?->id,
            'occupation'     => $this->occupation,
            'sports_hobbies' => $this->sports_hobbies,
            'marital_status' => $this->marital_status
        ];
    }
}
