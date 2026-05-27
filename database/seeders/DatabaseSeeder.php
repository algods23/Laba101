<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\ItemCategory;
use App\Models\LaundryOrder;
use App\Models\LaundryService;
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
        User::query()->updateOrCreate(
            ['email' => 'admin@laba101.test'],
            [
                'name' => 'Laba101 Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'staff@laba101.test'],
            [
                'name' => 'Laba101 Staff',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ]
        );

        collect([
            'Wash & Fold' => 'Drop-off',
            'Dry Clean' => 'Full Service',
            'Comforter Cleaning' => 'Self Service Wash',
            'Ironing' => 'Self Service Dry',
            'Pickup & Delivery' => 'Dry Only',
            'Drying 40 mins' => 'Dry Only',
        ])->each(function (string $newName, string $oldName): void {
            LaundryService::query()->where('name', $oldName)->update(['name' => $newName]);
        });

        $washFold = LaundryService::query()->updateOrCreate(['name' => 'Drop-off'], [
            'description' => 'Wash, dry and fold.',
            'category' => 'Drop-Off',
            'service_type' => LaundryService::TYPE_ORDER,
            'price_per_kg' => 185,
            'max_kg' => 8,
            'drying_minutes' => 40,
            'includes' => ['Wash', 'Dry', 'Fold'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 24,
            'is_active' => true,
        ]);

        $express = LaundryService::query()->updateOrCreate(['name' => 'Full Service'], [
            'description' => 'Wash, dry, fold, detergent and Fabcon.',
            'category' => 'Full Service',
            'service_type' => LaundryService::TYPE_ORDER,
            'price_per_kg' => 200,
            'max_kg' => 8,
            'drying_minutes' => 40,
            'includes' => ['Wash', 'Dry', 'Fold', 'Detergent', 'Fabcon'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 24,
            'is_active' => true,
        ]);

        $bedding = LaundryService::query()->updateOrCreate(['name' => 'Self Service Wash'], [
            'description' => 'Max of 8kg per load.',
            'category' => 'Self Service',
            'price_per_kg' => 60,
            'max_kg' => 8,
            'drying_minutes' => null,
            'includes' => ['Wash'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 1,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Self Service Dry'], [
            'description' => 'Regular time: 40 mins drying time.',
            'category' => 'Self Service',
            'price_per_kg' => 70,
            'max_kg' => 8,
            'drying_minutes' => 40,
            'includes' => ['Dry'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 1,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Dry Only'], [
            'description' => 'Standard drying rate.',
            'category' => 'Dry Only',
            'price_per_kg' => 70,
            'max_kg' => 8,
            'drying_minutes' => 40,
            'includes' => ['Dry'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 1,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Additional Dry 10 mins'], [
            'description' => 'Additional drying time.',
            'category' => 'Dry Only',
            'price_per_kg' => 30,
            'max_kg' => 8,
            'drying_minutes' => 10,
            'includes' => ['Dry'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 1,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Additional Dry 20 mins'], [
            'description' => 'Additional drying time.',
            'category' => 'Dry Only',
            'price_per_kg' => 50,
            'max_kg' => 8,
            'drying_minutes' => 20,
            'includes' => ['Dry'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 1,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Additional Dry 40 mins'], [
            'description' => 'Additional drying time.',
            'category' => 'Dry Only',
            'price_per_kg' => 70,
            'max_kg' => 8,
            'drying_minutes' => 40,
            'includes' => ['Dry'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 1,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Additional Zonrox'], [
            'description' => 'Extra Zonrox bleach add-on per load.',
            'category' => 'Add-on',
            'service_type' => LaundryService::TYPE_ADDON,
            'price_per_kg' => 25,
            'max_kg' => 0,
            'drying_minutes' => null,
            'includes' => ['Zonrox'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 0,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Additional Fabcon'], [
            'description' => 'Extra Fabcon fabric conditioner add-on per load.',
            'category' => 'Add-on',
            'service_type' => LaundryService::TYPE_ADDON,
            'price_per_kg' => 25,
            'max_kg' => 0,
            'drying_minutes' => null,
            'includes' => ['Fabcon'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 0,
            'is_active' => true,
        ]);

        LaundryService::query()->updateOrCreate(['name' => 'Comforter / Bulky Load'], [
            'description' => 'Comforter 4kg max per load. Thin blankets, bedsheets, bath towels, pillow cases and curtains: 6kg max per load.',
            'category' => 'Comforter',
            'service_type' => LaundryService::TYPE_ORDER,
            'price_per_kg' => 200,
            'max_kg' => 8,
            'drying_minutes' => 40,
            'includes' => ['Wash', 'Dry', 'Fold'],
            'additional_charge' => 0,
            'rush_fee' => 0,
            'delivery_fee' => 0,
            'turnaround_hours' => 24,
            'is_active' => true,
        ]);

        $regularClothes = ItemCategory::query()->updateOrCreate(['name' => 'Regular Clothes'], [
            'max_kg' => 8,
            'additional_fee' => 0,
            'is_active' => true,
        ]);

        collect([
            ['name' => 'Comforter', 'max_kg' => 4],
            ['name' => 'Thin Blankets', 'max_kg' => 6],
            ['name' => 'Bedsheets', 'max_kg' => 6],
            ['name' => 'Bath Towels', 'max_kg' => 6],
            ['name' => 'Curtains', 'max_kg' => 6],
        ])->each(fn (array $category) => ItemCategory::query()->updateOrCreate(['name' => $category['name']], [
            'max_kg' => $category['max_kg'],
            'additional_fee' => 0,
            'is_active' => true,
        ]));

        $customers = collect([
            ['name' => 'Mara Santos', 'phone' => '0917 482 1101', 'address' => 'Bajada, Davao City'],
            ['name' => 'Jun Rivera', 'phone' => '0928 314 7720', 'address' => 'Lanang, Davao City'],
            ['name' => 'Ana Cruz', 'phone' => '0935 901 2234', 'address' => 'Matina, Davao City'],
        ])->map(fn (array $customer) => Customer::query()->updateOrCreate(['phone' => $customer['phone']], $customer));

        LaundryOrder::query()->updateOrCreate(['order_number' => 'LB260527-001'], [
            'order_number' => 'LB260527-001',
            'customer_id' => $customers[0]->id,
            'service_id' => $washFold->id,
            'item_category_id' => $regularClothes->id,
            'status' => 'washing',
            'weight_kg' => 5.75,
            'price_per_kg' => $washFold->price_per_kg,
            'total_amount' => 185,
            'additional_charge' => 0,
            'paid_amount' => 200,
            'due_at' => now()->addHours(18),
            'notes' => 'Separate white uniforms.',
        ]);

        LaundryOrder::query()->updateOrCreate(['order_number' => 'LB260527-002'], [
            'order_number' => 'LB260527-002',
            'customer_id' => $customers[1]->id,
            'service_id' => $express->id,
            'item_category_id' => $regularClothes->id,
            'status' => 'ready',
            'weight_kg' => 3.20,
            'price_per_kg' => $express->price_per_kg,
            'total_amount' => 200,
            'additional_charge' => 0,
            'paid_amount' => 200,
            'due_at' => now()->addHours(2),
        ]);

        LaundryOrder::query()->updateOrCreate(['order_number' => 'LB260527-003'], [
            'order_number' => 'LB260527-003',
            'customer_id' => $customers[2]->id,
            'service_id' => $bedding->id,
            'item_category_id' => $regularClothes->id,
            'status' => 'received',
            'weight_kg' => 7.50,
            'price_per_kg' => $bedding->price_per_kg,
            'total_amount' => 60,
            'additional_charge' => 0,
            'paid_amount' => 0,
            'due_at' => now()->addHours(36),
        ]);

        LaundryService::query()->update(['service_type' => LaundryService::TYPE_ORDER]);
        LaundryService::query()
            ->whereIn('name', ['Additional Zonrox', 'Additional Fabcon'])
            ->update(['service_type' => LaundryService::TYPE_ADDON]);
    }
}
