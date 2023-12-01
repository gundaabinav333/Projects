<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\login;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PaySlipContainer;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\SalaryController;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// routes/web.php or routes/api.php

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegistrationController::class, 'register']);

// Protected routes (require authentication)
Route::middleware(['auth'])->group(function () {
    // Department routes
    Route::post('/add-department', [DepartmentController::class, 'addDepartment']);
    Route::get('/get-departments', [DepartmentController::class, 'getDepartmentsList']);
    Route::delete('/remove-department/{id}', [DepartmentController::class, 'removeDepartment']);

    // Employee routes
    Route::post('/add-employee', [EmployeeController::class, 'create']);
    Route::delete('/remove-employee/{employeeId}', [EmployeeController::class, 'removeEmployee']);
    Route::get('/get-employees', [EmployeeController::class, 'getEmployeesList']);
    Route::get('/employee-salary/{employeeId}',[EmployeeController::class,'getEmployeeSalary']);

    // Designation routes
    Route::post('/add-designation', [DesignationController::class, 'addDesignation']);
    Route::delete('/remove-designation/{id}', [DesignationController::class, 'removeDesignation']);
    Route::get('/get-designations', [DesignationController::class, 'getDesignationsList']);

    // Salary routes
    Route::put('/update-salary/{id}', [SalaryController::class, 'updateSalary']);
    Route::get('/get-salaries', [SalaryController::class, 'getSalaries']);
    Route::post('/generate-pay-slip', [SalaryController::class, 'generatePaySlip']);


    // Project routes
    Route::post('/add-project', [ProjectController::class, 'addProject']);
    Route::delete('/remove-project/{id}', [ProjectController::class, 'removeProject']);
    Route::get('/get-projects', [ProjectController::class, 'getProjects']);
    Route::post('/add-employeeTo-project', [ProjectController::class, 'addEmployeeToProject']);

    Route::post('/pay-slip', [PaySlipContainer::class, 'getPayslipData']);


});