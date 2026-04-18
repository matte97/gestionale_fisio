<?php

namespace App\Services;

use App\Models\Therapy;
use Illuminate\Support\Facades\Cache;

class TherapyService
{
    public function list($user)
    {
        $cacheKey = "therapies_user_{$user->id}";

        return Cache::tags(["therapies_{$user->id}"])->remember($cacheKey, 3600, function () use ($user) {
            return Therapy::select('id', 'name', 'color')->where('user_id', $user->id)->get();
        });
    }

    public function create($user, array $data)
    {
        $data['user_id'] = $user->id;
        $therapy = Therapy::create($data);

        Cache::tags(["therapies_{$user->id}"])->flush();

        return $therapy;
    }

    public function findById($user, string $id)
    {
        return Therapy::select('id', 'name', 'color')->where('user_id', $user->id)->find($id);
    }

    public function update($user, string $id, array $data)
    {
        $therapy = Therapy::where("user_id", $user->id)->find($id);

        if (!$therapy) {
            return null;
        }

        $therapy->update($data);
        Cache::tags(["therapies_{$user->id}"])->flush();

        return $therapy;
    }

    public function delete($user, string $id)
    {
        $therapy = Therapy::where("user_id", $user->id)->find($id);

        if (!$therapy) {
            return false;
        }

        $deleted = $therapy->delete();
        if ($deleted) {
            Cache::tags(["therapies_{$user->id}"])->flush();
        }

        return (bool) $deleted;
    }
}
