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

    public function show($id)
    {
        return Employee::findOrFail($id);
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

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $employee->employee_id = $request->employeeId;
        $employee->name        = $request->name;
        $employee->email       = $request->email;
        $employee->department  = $request->department;

        $employee->save();

        return response()->json([
            'message' => '更新完了',
            'data' => $employee
        ]);
    }
	public function destroy($id)
  {
       $employee = Employee::findOrFail($id);
       $employee->delete();

       return response()->json([
          'message' => '削除完了'
    ]);
}
}
