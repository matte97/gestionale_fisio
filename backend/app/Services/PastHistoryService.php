<?php

namespace App\Services;

use App\Models\PastHistory;

class PastHistoryService
{
    public function createOrUpdate($user, array $data)
    {
        $data['user_id'] = $user->id;
        
        return PastHistory::updateOrCreate(
            ['anamnesis_id' => $data["anamnesis_id"]],
            $data
        );
    }
}
