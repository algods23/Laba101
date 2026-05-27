<?php

use App\Models\LaundryOrder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->json('workflow_completed')->nullable()->after('status');
        });

        LaundryOrder::withoutGlobalScope('branch')
            ->with(['service'])
            ->get()
            ->each(function (LaundryOrder $order) {
                $order->update([
                    'workflow_completed' => $order->backfillWorkflowFromStatus(),
                ]);
            });
    }

    public function down(): void
    {
        Schema::table('laundry_orders', function (Blueprint $table) {
            $table->dropColumn('workflow_completed');
        });
    }
};
