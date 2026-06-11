<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function store(Request $request)
    {
        $sale = Sale::create([
            'employee_id' => $request->employee_id,
            'amount' => $request->amount,
            'sale_date' => $request->sale_date,
            'memo' => $request->memo,
        ]);

        return response()->json($sale, 201);
    }

    public function index()
    {
        return Sale::orderBy('sale_date', 'desc')->get();
    }
}
