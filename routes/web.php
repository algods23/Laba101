<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/disbursements', [PageController::class, 'disbursements'])->name('disbursements.index');
    Route::post('/disbursement-expenses', [PageController::class, 'storeDisbursementExpense'])->name('disbursement-expenses.store');
    Route::post('/daily-sales', [PageController::class, 'storeDailySale'])->name('daily-sales.store');
    Route::get('/reports', [PageController::class, 'reports'])->name('reports.index');
    Route::get('/export-reports', [PageController::class, 'exportReports'])->name('reports.export');
    Route::get('/inventory', [PageController::class, 'placeholder'])->defaults('page', 'inventory')->name('inventory.index');
    Route::post('/set-branch', [PageController::class, 'setBranch'])->name('set.branch');

    Route::get('/maintenance', [PageController::class, 'maintenance'])->name('maintenance.index');
    Route::post('/maintenance/subcleaning', [PageController::class, 'storeSubcleaning'])->name('subcleaning.store');
    Route::patch('/maintenance/machines/{machine}/complete', [PageController::class, 'completeMachine'])->name('machines.complete');
    Route::post('/maintenance/machines', [PageController::class, 'storeMachine'])->name('machines.store');
    Route::patch('/maintenance/machines/{machine}', [PageController::class, 'updateMachine'])->name('machines.update');
    Route::delete('/maintenance/machines/{machine}', [PageController::class, 'destroyMachine'])->name('machines.destroy');

    Route::get('/pos-orders', [DashboardController::class, 'posOrders'])->name('pos.orders');
    Route::post('/orders', [DashboardController::class, 'store'])->name('orders.store');
    Route::patch('/orders/{order}/status', [DashboardController::class, 'updateStatus'])->name('orders.status');

    Route::middleware('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/customers', [PageController::class, 'placeholder'])->defaults('page', 'customers')->name('customers.index');
        Route::get('/pricing-services', [PageController::class, 'pricing'])->name('pricing.index');
        Route::post('/pricing-services', [PageController::class, 'storeService'])->name('pricing.store');
        Route::patch('/pricing-services/{service}', [PageController::class, 'updateService'])->name('pricing.update');
        Route::delete('/pricing-services/{service}', [PageController::class, 'destroyService'])->name('pricing.destroy');
        Route::post('/item-categories', [PageController::class, 'storeItemCategory'])->name('item-categories.store');
        Route::patch('/item-categories/{itemCategory}', [PageController::class, 'updateItemCategory'])->name('item-categories.update');
        Route::delete('/item-categories/{itemCategory}', [PageController::class, 'destroyItemCategory'])->name('item-categories.destroy');
        Route::get('/staff', [PageController::class, 'staff'])->name('staff.index');
        Route::post('/staff', [PageController::class, 'storeStaff'])->name('staff.store');
        Route::patch('/staff/{user}', [PageController::class, 'updateStaff'])->name('staff.update');
        Route::delete('/staff/{user}', [PageController::class, 'destroyStaff'])->name('staff.destroy');
        Route::get('/settings', [PageController::class, 'settings'])->name('settings.index');
    });

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
