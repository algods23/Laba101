<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('laundry_services', function (Blueprint $table) {
            $table->decimal('max_kg', 8, 2)->default(8)->after('price_per_kg');
            $table->unsignedSmallInteger('drying_minutes')->nullable()->after('max_kg');
            $table->json('includes')->nullable()->after('drying_minutes');
            $table->decimal('additional_charge', 8, 2)->default(0)->after('includes');
        });

        Schema::create('item_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('max_kg', 8, 2)->default(8);
            $table->decimal('additional_fee', 8, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->foreignId('item_category_id')->nullable()->after('service_id')->constrained('item_categories')->nullOnDelete();
            $table->decimal('additional_charge', 8, 2)->default(0)->after('total_amount');
        });
    }

    public function down(): void
    {
        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('item_category_id');
            $table->dropColumn('additional_charge');
        });

        Schema::dropIfExists('item_categories');

        Schema::table('laundry_services', function (Blueprint $table) {
            $table->dropColumn(['max_kg', 'drying_minutes', 'includes', 'additional_charge']);
        });
    }
};
