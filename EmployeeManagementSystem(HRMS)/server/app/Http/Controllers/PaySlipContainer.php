<?php

namespace App\Http\Controllers;

use App\Models\EmployeePaySlip;
use Illuminate\Http\Request;

class PaySlipContainer extends Controller
{
    public function getPayslipData(Request $request)
    {
        $empId = $request->input('empId');
        $month = $request->input('month');

        $payslipData = EmployeePaySlip::with('employee')
            ->where('employee_id', $empId)
            ->where('month_id', $month)
            ->first();

        if (!$payslipData) {
            return response()->json(['error' => 'Payslip data not found'], 404);
        }

        return response()->json($payslipData);
    }
}
