<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daily_sales', function (Blueprint $table) {
            $table->id();
            $table->date('sale_date')->unique();
            $table->decimal('amount', 10, 2);
            $table->string('notes', 500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_sales');
    }
};
