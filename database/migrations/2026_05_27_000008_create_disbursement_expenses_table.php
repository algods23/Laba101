<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disbursement_expenses', function (Blueprint $table) {
            $table->id();
            $table->date('expense_date');
            $table->string('category', 120);
            $table->string('description', 500)->nullable();
            $table->decimal('amount', 10, 2);
            $table->timestamps();

            $table->index('expense_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disbursement_expenses');
    }
};
