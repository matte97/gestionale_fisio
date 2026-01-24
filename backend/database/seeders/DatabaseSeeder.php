<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test',
                'password' => Hash::make('test123')
            ]
            );

        $patients = Patient::factory()
                        ->count(30)
                        ->for($user)
                        ->create();

        foreach($patients as $patient) {
            Appointment::factory()
                    ->count(3)
                    ->for($patient)
                    ->state(['user_id' => $user->id])
                    ->create();
        }   
    }
}
