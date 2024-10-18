<?php

namespace Database\Factories;

use App\Models\Mahasiswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mahasiswa>
 */
class MahasiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Mahasiswa::class;
    public function definition(): array
    {
        $this->faker = \Faker\Factory::create('id_ID');

        return [
            'nim' => $this->faker->unique()->numerify('#######'), 
            'nama_lengkap' => $this->faker->name(),               
            'jenkel' => $this->faker->randomElement(['L', 'P']),  
            'alamat' => $this->faker->address()                   
        ];
    }
}
