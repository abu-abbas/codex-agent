<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['throttle:120,1'])->group(function () {
    Route::get('/health', fn () => ['status' => 'ok']);
    Route::apiResource('transactions', TransactionController::class)->only(['index', 'store']);
});
