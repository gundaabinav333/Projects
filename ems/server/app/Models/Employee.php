<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{

    public function designations()
    {
        return $this->belongsToMany(Designation::class, 'employee_designation');
    }

    public function department(){
        return $this->belongsTo(Department::class);
    }

    public function salary(){
        return $this->hasOne(Salary::class);
    }
    use HasFactory;
}
