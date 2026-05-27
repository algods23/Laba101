<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('laundry_services', function (Blueprint $table) {
            $table->string('service_type')->default('order')->after('category');
        });

        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->decimal('extra_service_amount', 8, 2)->default(0)->after('additional_charge');
            $table->json('extra_services')->nullable()->after('extra_service_amount');
        });
    }

    public function down(): void
    {
        Schema::table('laundry_services', function (Blueprint $table) {
            $table->dropColumn('service_type');
        });

        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->dropColumn(['extra_service_amount', 'extra_services']);
        });
    }
};
