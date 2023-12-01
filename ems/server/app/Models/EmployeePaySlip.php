<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePaySlip extends Model
{
    use HasFactory;
    protected $table = 'employee_pay_slip';
    protected $fillable = [
        'employee_id', 'month_id', 'travel_allowance',
        'rent_allowance', 'provident_fund', 'bonus', 'tax', 'net_salary','basic_salary'
    ];

    
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
