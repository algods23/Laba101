<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subcleanings', function (Blueprint $table) {
            $table->dropColumn('area');
            $table->string('cleaning_status')->default('completed');
        });
    }

    public function down(): void
    {
        Schema::table('subcleanings', function (Blueprint $table) {
            $table->string('area')->nullable();
            $table->dropColumn('cleaning_status');
        });
    }
};
