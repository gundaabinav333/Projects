<?php

namespace App\Http\Controllers;
use App\Models\Employee;

use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\EmployeePaySlip;



class SalaryController extends Controller
{
    public function updateSalary($employee_id, Request $request)
    {
        $newSalary = $request->input('salary');

        try {
            $salary = Salary::where('employee_id', $employee_id)->firstOrFail();

            $salary->update([
                'salary' => $newSalary,
            ]);

            return response()->json(['success' => true, 'message' => 'Salary updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function getSalaries()
    {
        $salaries = Salary::with('employee')->get();
        return response()->json(['success' => true, 'salaries' => $salaries]);
    }

    

    public function generatePaySlip(Request $request)
    {
        $request->validate([
            'travelAllowance' => 'required|numeric',
            'rentAllowance' => 'required|numeric',
            'providentFund' => 'required|numeric',
            'bonus' => 'required|numeric',
            'tax' => 'required|numeric',
            'month_id'=>'required|numeric',
        ]);

        $employeeId=$request->input('empId');
        try {
            DB::beginTransaction();

            $employee = Employee::findOrFail($employeeId);

            $basicSalary =$request->input('basicPay');
            $totalEarnings = $basicSalary + $request->input('bonus') + $request->input('rentAllowance') + $request->input('travelAllowance');
            $tax = $request->input('tax');
            $providentFund = $request->input('providentFund');
            $netSalary = $totalEarnings - ($tax + $providentFund);

            $paySlip = new EmployeePaySlip([
                'employee_id' => $employee->id,
                'month_id' => $request->input('month_id'),
                'travel_allowance' => $request->input('travelAllowance'),
                'rent_allowance' => $request->input('rentAllowance'),
                'provident_fund' => $providentFund,
                'bonus' => $request->input('bonus'),
                'tax' => $tax,
                'net_salary' => $netSalary,
                'basic_salary'=>$basicSalary
            ]);

            $paySlip->save();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Pay slip generated successfully',
                'data' => $paySlip,
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
   
}

