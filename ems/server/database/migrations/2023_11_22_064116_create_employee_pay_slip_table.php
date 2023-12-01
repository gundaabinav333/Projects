<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_pay_slip', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained();
            $table->foreignId("month_id")->constrained();
            $table->integer('basic_salary');
            $table->integer('travel_allowance');
            $table->integer('rent_allowance');
            $table->integer('provident_fund');
            $table->integer('bonus');
            $table->integer('tax');
            $table->integer('net_salary');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_pay_slip');
    }
};
