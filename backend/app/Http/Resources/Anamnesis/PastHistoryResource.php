<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PastHistoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anamnesis_id' => $this->anamnesis_id,
            'patient_id' => $this->patient_id,
            'social_anamnesis' => $this->social_anamnesis,
            'familiar_anamnesis' => $this->familiar_anamnesis,
            'remote_physiological_anamnesis' => $this->remote_physiological_anamnesis,
            'remote_pathological_anamnesis' => $this->remote_pathological_anamnesis,
            'pharmacological_anamnesis' => $this->pharmacological_anamnesis,
            'past_past_surgical_anamnesis' => $this->past_past_surgical_anamnesis,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
