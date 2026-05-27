<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('daily_sales', function (Blueprint $table) {
            $table->string('sale_number')->nullable()->unique()->after('id');
        });

        Schema::table('disbursement_expenses', function (Blueprint $table) {
            $table->string('disbursement_number')->nullable()->unique()->after('id');
            $table->string('name', 120)->nullable()->after('disbursement_number');
        });

        DB::table('daily_sales')->orderBy('id')->get()->each(function (object $sale, int $index) {
            DB::table('daily_sales')
                ->where('id', $sale->id)
                ->update(['sale_number' => 'SALE-'.str_pad((string) ($index + 1), 5, '0', STR_PAD_LEFT)]);
        });

        DB::table('disbursement_expenses')->orderBy('id')->get()->each(function (object $expense, int $index) {
            DB::table('disbursement_expenses')
                ->where('id', $expense->id)
                ->update(['disbursement_number' => 'DISB-'.str_pad((string) ($index + 1), 5, '0', STR_PAD_LEFT)]);
        });
    }

    public function down(): void
    {
        Schema::table('disbursement_expenses', function (Blueprint $table) {
            $table->dropColumn(['disbursement_number', 'name']);
        });

        Schema::table('daily_sales', function (Blueprint $table) {
            $table->dropColumn('sale_number');
        });
    }
};
