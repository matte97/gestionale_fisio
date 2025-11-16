<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TherapyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::query()->first()?->id ?? User::factory(),
            'name' => $this->faker->randomElement(['logopedia', 'fisioterapia', 'psicoterapia']),
            'color' => fake()->hexColor(),
        ];
    }
}
