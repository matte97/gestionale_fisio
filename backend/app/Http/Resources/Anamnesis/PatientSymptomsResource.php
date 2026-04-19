<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientSymptomsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'patient_history_id' => $this->patient_history_id,
            'type' => $this->type,
            'characteristic' => $this->characteristic,
            'pattern' => $this->pattern,
            'intensity_nprs' => $this->intensity_nprs,
            'frequency' => $this->frequency,
            'better_when' => $this->better_when,
            'worse_when' => $this->worse_when,
            'trend' => $this->trend,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
