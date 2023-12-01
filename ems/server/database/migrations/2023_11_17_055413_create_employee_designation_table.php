<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeDesignationTable extends Migration
{
    public function up()
    {
        Schema::create('employee_designation', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id');
            $table->unsignedBigInteger('designation_id');
            $table->timestamps();

            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('designation_id')->references('id')->on('designations')->onDelete('cascade');

            $table->unique(['employee_id', 'designation_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('employee_designation');
    }
}
