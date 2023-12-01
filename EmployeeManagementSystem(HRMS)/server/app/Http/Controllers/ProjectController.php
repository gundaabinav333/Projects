<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function addProject(Request $request)
    {
        $request->validate([
            "projectName" => "required|min:2|unique:projects,project_name",
            "clientName" => "required|min:2",

        ]);
    
        $uppercaseProjectName = strtoupper($request->input('projectName'));
        $uppercaseClientName = strtoupper($request->input('clientName'));

    
        $project = new Project();
        $project->project_name = $uppercaseProjectName;
        $project->client_name = $uppercaseClientName; 
        $project->save();
    
        return response()->json([
            "status" => true,
            "message" => "project created successfully",
            "data" => null,
        ]);
    }

    public function removeProject($id)
    {
    
            Project::findOrFail($id)->delete();
            return response()->json(['success' => true, 'message' => 'Project removed successfully']);
       
    }

    public function getProjects()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function addEmployeeToProject(Request $request){

        $request ->validate([
            "projectId" => "required|exists:projects,id",
            "employeeId" => "required|exists:employees,id",
        ]);

        

    }
}
