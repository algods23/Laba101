<?php

namespace App\Services;

use App\Models\ItemCategory;
use App\Models\LaundryService;
use Illuminate\Support\Collection;

class LaundryPricingService
{
    /**
     * @param  Collection<int, LaundryService>|array<int, LaundryService>  $addons
     * @return array{service_price: float, additional_charge: float, extra_service_amount: float, total_price: float, allowed_kg: float, extra_kg: float, warning: string|null, extra_services: array<int, array{id: int, name: string, price: float}>}
     */
    public function calculate(LaundryService $service, ItemCategory $category, float $weightKg, Collection|array $addons = []): array
    {
        $addons = $addons instanceof Collection ? $addons : collect($addons);
        $allowedKg = (float) $category->max_kg;
        $extraKg = max(0, $weightKg - $allowedKg);
        $chargeUnit = (float) $service->additional_charge + (float) $category->additional_fee;
        $additionalCharge = $extraKg > 0 ? ceil($extraKg) * $chargeUnit : 0;
        $servicePrice = (float) $service->price_per_kg;

        $extraServices = $addons->map(fn (LaundryService $addon) => [
            'id' => $addon->id,
            'name' => $addon->name,
            'price' => (float) $addon->price_per_kg,
        ])->values()->all();

        $extraServiceAmount = $addons->sum(fn (LaundryService $addon) => (float) $addon->price_per_kg);

        return [
            'service_price' => round($servicePrice, 2),
            'additional_charge' => round($additionalCharge, 2),
            'extra_service_amount' => round($extraServiceAmount, 2),
            'extra_services' => $extraServices,
            'total_price' => round($servicePrice + $additionalCharge + $extraServiceAmount, 2),
            'allowed_kg' => round($allowedKg, 2),
            'extra_kg' => round($extraKg, 2),
            'warning' => $extraKg > 0 ? 'Weight exceeds the '.$category->name.' load limit of '.number_format($allowedKg, 2).' kg.' : null,
        ];
    }
}
