<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhysicalTherapyDiagnosisResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anamnesis_id' => $this->anamnesis_id,
            'structural_impairments' => $this->structural_impairments,
            'functional_limitations' => $this->functional_limitations,
            'participation_restrictions' => $this->participation_restrictions,
            'physical_therapy_diagnosis' => $this->physical_therapy_diagnosis,
            'management_plan' => $this->management_plan,
            'prognosis' => $this->prognosis,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
