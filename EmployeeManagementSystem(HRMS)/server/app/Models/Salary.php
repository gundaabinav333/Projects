<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{   
    protected $table = 'salaries';
    protected $fillable = ['employee_id', 'salary'];

    public function employee(){
        return $this->belongsTo(Employee::class);
    }

    use HasFactory;
}
