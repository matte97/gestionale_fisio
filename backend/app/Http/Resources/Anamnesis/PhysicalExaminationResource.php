<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhysicalExaminationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anamnesis_id' => $this->anamnesis_id,
            'active_movements' => $this->active_movements,
            'active_movements_region' => json_decode($this->active_movements_region),
            'passive_physiological_movements' => $this->passive_physiological_movements,
            'passive_movements_region' => json_decode($this->passive_movements_region),
            'accessory_passive_movements' => $this->accessory_passive_movements,
            'accessory_passive_movements_region' => json_decode($this->accessory_passive_movements_region),
            'muscle_tests' => $this->muscle_tests,
            'neurological_tests' => $this->neurological_tests,
            'special_tests' => $this->special_tests,
            'palpation' => $this->palpation,
            'additional_observations' => $this->additional_observations,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
