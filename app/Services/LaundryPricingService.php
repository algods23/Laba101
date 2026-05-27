<?php

namespace App\Services;

use App\Models\ItemCategory;
use App\Models\LaundryService;

class LaundryPricingService
{
    /**
     * @return array{service_price: float, additional_charge: float, total_price: float, allowed_kg: float, extra_kg: float, warning: string|null}
     */
    public function calculate(LaundryService $service, ItemCategory $category, float $weightKg): array
    {
        $serviceMax = (float) $service->max_kg;
        $categoryMax = (float) $category->max_kg;
        $allowedKg = min($serviceMax, $categoryMax);
        $extraKg = max(0, $weightKg - $allowedKg);
        $chargeUnit = (float) $service->additional_charge + (float) $category->additional_fee;
        $additionalCharge = $extraKg > 0 ? ceil($extraKg) * $chargeUnit : 0;
        $servicePrice = (float) $service->price_per_kg;

        return [
            'service_price' => round($servicePrice, 2),
            'additional_charge' => round($additionalCharge, 2),
            'total_price' => round($servicePrice + $additionalCharge, 2),
            'allowed_kg' => round($allowedKg, 2),
            'extra_kg' => round($extraKg, 2),
            'warning' => $extraKg > 0 ? 'Selected items exceed allowed load capacity.' : null,
        ];
    }
}
