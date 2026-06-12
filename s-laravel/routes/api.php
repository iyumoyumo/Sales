<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\SalesController;

Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::post('/sales', [SalesController::class, 'store']);
Route::get('/sales', [SalesController::class, 'index']);
Route::get('/employees/{id}', [EmployeeController::class, 'show']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);

