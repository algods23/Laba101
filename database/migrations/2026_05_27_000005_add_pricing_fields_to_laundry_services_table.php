<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('laundry_services', function (Blueprint $table) {
            $table->string('category')->default('Laundry')->after('description');
            $table->decimal('rush_fee', 8, 2)->default(0)->after('price_per_kg');
            $table->decimal('delivery_fee', 8, 2)->default(0)->after('rush_fee');
        });
    }

    public function down(): void
    {
        Schema::table('laundry_services', function (Blueprint $table) {
            $table->dropColumn(['category', 'rush_fee', 'delivery_fee']);
        });
    }
};
