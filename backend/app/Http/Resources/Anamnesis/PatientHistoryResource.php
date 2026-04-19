<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientHistoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anamnesis_id' => $this->anamnesis_id,
            'body_map' => $this->body_map,
            'symptoms' => PatientSymptomsResource::collection($this->whenLoaded('symptoms')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
