<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('laundry_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('laundry_order_id')->constrained('laundry_orders')->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->string('payment_method', 20);
            $table->string('payment_reference', 120)->nullable();
            $table->timestamp('received_at')->nullable();
            $table->string('branch')->default('Main Store')->index();
            $table->timestamps();
        });

        DB::table('laundry_orders')
            ->where('paid_amount', '>', 0)
            ->orderBy('id')
            ->get()
            ->each(function ($order) {
                DB::table('laundry_payments')->insert([
                    'laundry_order_id' => $order->id,
                    'amount' => $order->paid_amount,
                    'payment_method' => $order->payment_method ?: 'cash',
                    'payment_reference' => $order->payment_reference,
                    'received_at' => $order->updated_at,
                    'branch' => $order->branch ?: 'Main Store',
                    'created_at' => $order->updated_at,
                    'updated_at' => $order->updated_at,
                ]);
            });
    }

    public function down(): void
    {
        Schema::dropIfExists('laundry_payments');
    }
};
