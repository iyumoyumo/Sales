<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
   public function index()
    {
        return Employee::all();
    }

    public function store(Request $request)
    {
        $employee = Employee::create([
            'employee_id' => $request->employeeId,
            'name'        => $request->name,
            'email'       => $request->email,
            'department'  => $request->department,
        ]);

        return response()->json([
            'message' => '登録完了',
            'data' => $employee
        ]);
    }
}
