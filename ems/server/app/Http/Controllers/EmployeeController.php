<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeePaySlip;
use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            "name" => "required|min:3",
            "joiningDate" => "required",
            "mobile" => "required|max:12|unique:employees,mobile_no",
            'panCard' => 'required|size:10|unique:employees,pan_card',
            "email" => "required|email|unique:employees,email",
            "salary" => "required",
            "designation_id" => "required|exists:designations,id",
            "department_id" => "required|exists:departments,id",
        ]);

        try {
            DB::beginTransaction();

            // Create a new employee record
            $employee = new Employee();
            $employee->name = $request->input('name');
            $employee->mobile_no = $request->input('mobile');
            $employee->pan_card = $request->input('panCard');
            $employee->joining_date = $request->input('joiningDate');
            $employee->email = $request->input('email');
            $employee->save();

            $employee->designations()->attach($request->input('designation_id'));




            
            $salary = new Salary();
            $salary->employee_id = $employee->id; 
            $salary->salary = $request->input('salary'); 
            $salary->save();

            DB::commit();

            return response()->json([
                "status" => true,
                "message" => "Employee created successfully",
                "data" => $employee,
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "status" => false,
                "message" => $e->getMessage(),
                "data" => null,
            ], 500);
        }
    }

    public function getEmployeesList()
    {
        $employees = Employee::with('salary')->get();
        return response()->json($employees);
    }
    public function paySlips()
    {
        return $this->hasMany(EmployeePaySlip::class, 'employee_id');
    }

    public function removeEmployee($employeeId)
    {
        try {
            $employee = Employee::find($employeeId);

            if (!$employee) {
                return response()->json(['message' => 'Employee not found'], 404);
            }

            $employee->delete();

            return response()->json(['message' => 'Employee removed successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error removing employee'], 500);
        }
    }

    public function getEmployeeSalary($employeeId)
    {
        try {
            $employee = Employee::with('salary')->find($employeeId);

            if (!$employee) {
                return response()->json(['message' => 'Employee not found'], 404);
            }

            $salary = $employee->salary;

            return response()->json([
                'message' => 'Salary retrieved successfully',
                'data' => $salary,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving salary'], 500);
        }
    }
}
