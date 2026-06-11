<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
    'employee_id',
    'amount',
    'sale_date',
    'memo',
];

}
