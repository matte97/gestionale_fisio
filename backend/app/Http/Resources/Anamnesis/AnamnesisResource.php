<?php

namespace App\Http\Resources\Anamnesis;

use App\Http\Resources\Patients\PatientResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnamnesisResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'patient_id' => $this->patient_id,
            'patient' => new PatientResource($this->whenLoaded('patient')),
            'patient_history' => new PatientHistoryResource($this->whenLoaded('patient_history')),
            'past_history' => new PastHistoryResource($this->whenLoaded('past_history')),
            'condition_assessment' => new ConditionAssessmentResource($this->whenLoaded('condition_assessment')),
            'physical_examination' => new PhysicalExaminationResource($this->whenLoaded('physical_examination')),
            'physical_therapy_diagnosis' => new PhysicalTherapyDiagnosisResource($this->whenLoaded('physical_therapy_diagnosis')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
