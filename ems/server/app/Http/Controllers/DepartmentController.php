<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class DepartmentController extends Controller
{
    public function addDepartment(Request $request)
    {
        $request->validate([
            "departmentName" => "required|min:2|unique:departments,department_name",
        ]);

        $uppercaseDepartmentName = strtoupper($request->input('departmentName'));

        $department = new Department();
        $department->department_name = $uppercaseDepartmentName;

        $department->save();

        return response()->json([
            "status" => true,
            "message" => "Department created successfully",
            "data" => null,
        ]);
    }




    public function removeDepartment($id)
    {

        Department::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Department removed successfully']);
    }


    public function getDepartmentsList()
    {
        $departments = Department::withCount('employees')->get();

        return response()->json($departments);
    }
}
