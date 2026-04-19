<?php

namespace App\Http\Resources\Appointments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id'      => $this->user_id,
            'id'           => $this->id,
            'patient_id'   => $this->patient_id,
            'patient_name' => $this->patient?->first_name . ' ' . $this->patient?->last_name,
            'start_time'   => $this->start_time,
            'end_time'     => $this->end_time,
            'therapy_id'   => $this->therapy_id,
            'status'       => $this->status,
            'notes'        => $this->notes
        ];
    }
}
