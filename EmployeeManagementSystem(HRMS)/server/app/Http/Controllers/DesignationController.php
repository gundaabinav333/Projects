<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;

class DesignationController extends Controller
{

    public function addDesignation(Request $request)
    {
        $request->validate([
            "designationName" => "required|min:2|unique:designations,designation_name",

        ]);

        $uppercaseDesignationName = strtoupper($request->input('designationName'));

        $designation = new Designation();
        $designation->designation_name = $uppercaseDesignationName;

        $designation->save();

        return response()->json([
            "status" => true,
            "message" => "Designation created successfully",
            "data" => null,
        ]);
    }


    public function removeDesignation($id)
    {
        Designation::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Department removed successfully',]);
    }

    public function getDesignationsList()
    {
        $designations = Designation::all();
        return response()->json($designations);
    }
}
