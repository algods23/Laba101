<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->string('branch')->default('Main Store')->after('id');
        });

        Schema::table('daily_sales', function (Blueprint $table) {
            $table->string('branch')->default('Main Store')->after('id');
        });

        Schema::table('disbursement_expenses', function (Blueprint $table) {
            $table->string('branch')->default('Main Store')->after('id');
        });

        Schema::table('machines', function (Blueprint $table) {
            $table->string('branch')->default('Main Store')->after('id');
        });

        Schema::table('subcleanings', function (Blueprint $table) {
            $table->string('branch')->default('Main Store')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->dropColumn('branch');
        });

        Schema::table('daily_sales', function (Blueprint $table) {
            $table->dropColumn('branch');
        });

        Schema::table('disbursement_expenses', function (Blueprint $table) {
            $table->dropColumn('branch');
        });

        Schema::table('machines', function (Blueprint $table) {
            $table->dropColumn('branch');
        });

        Schema::table('subcleanings', function (Blueprint $table) {
            $table->dropColumn('branch');
        });
    }
};
