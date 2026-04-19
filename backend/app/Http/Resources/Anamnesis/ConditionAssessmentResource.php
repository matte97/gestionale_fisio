<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConditionAssessmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anamnesis_id' => $this->anamnesis_id,
            'main_complaint' => $this->main_complaint,
            'secondary_complaint' => $this->secondary_complaint,
            'patient_expectations' => $this->patient_expectations,
            'treatment_goals' => $this->treatment_goals,
            'red_flags_present' => (bool)$this->red_flags_present,
            'red_flags_notes' => $this->red_flags_notes,
            'yellow_flags_present' => (bool)$this->yellow_flags_present,
            'yellow_flags_notes' => $this->yellow_flags_notes,
            'neural_mechanosensitivity_present' => (bool)$this->neural_mechanosensitivity_present,
            'neural_mechanosensitivity_notes' => $this->neural_mechanosensitivity_notes,
            'hyperalgesia_or_allodynia_present' => (bool)$this->hyperalgesia_or_allodynia_present,
            'hyperalgesia_or_allodynia_notes' => $this->hyperalgesia_or_allodynia_notes,
            'biological_factors' => $this->biological_factors,
            'psychological_factors' => $this->psychological_factors,
            'social_factors' => $this->social_factors,
            'positive_prognostic_factors' => $this->positive_prognostic_factors,
            'negative_prognostic_factors' => $this->negative_prognostic_factors,
            'contraindications' => $this->contraindications,
            'precautions' => $this->precautions,
            'indications' => $this->indications,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
