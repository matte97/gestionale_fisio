<?php

namespace App\Services\ConditionAssessment;

use App\Models\ConditionAssessment;

class ConditionAssessmentService
{
    public function findByAnamnesis($user, $anamnesis_id)
    {
        return ConditionAssessment::where("anamnesis_id", $anamnesis_id)
            ->whereHas("anamnesis", function ($query) use ($user) {
                $query->where("user_id", $user->id);
            })->first();
    }

    public function createOrUpdate($user, array $data)
    {
        return ConditionAssessment::updateOrCreate(
            ['anamnesis_id' => $data["anamnesis_id"]],
            $data
        );
    }
}
