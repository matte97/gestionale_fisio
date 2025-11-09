<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('+0 days', '+7 days');
        $end   = (clone $start)->modify('+1 hour');

        return [
            'user_id' => User::first()?->id ?? User::factory(),
            'patient_id' => null,
            'start_time' => $start,
            'end_time' => $end,
            'therapy_type' => $this->faker->randomElement(['logopedia', 'fisioterapia', 'psicoterapia']),
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'cancelled']),
            'notes' => $this->faker->sentence(),
        ];
    }
}
