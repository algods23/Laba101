<?php

namespace Database\Seeders;

use App\Models\Machine;
use Illuminate\Database\Seeder;

class MachineSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 4; $i++) {
            Machine::query()->firstOrCreate(['machine_name' => "Washer $i"], [
                'machine_type' => 'washer',
                'status' => 'available',
            ]);
        }

        for ($i = 1; $i <= 4; $i++) {
            Machine::query()->firstOrCreate(['machine_name' => "Dryer $i"], [
                'machine_type' => 'dryer',
                'status' => 'available',
            ]);
        }
    }
}
