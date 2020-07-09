<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\ApiService;

class ExampleTest extends TestCase
{
    protected $service;

    public function setUp()
    {
        parent::setUp();

        $this->service = new ApiService();
    }

    public function testGetEmployees()
    {
        $this->assertTrue(!!$this->service->employees());
    }

    public function testCreateEmployee()
    {
        $id = $this->create();
        $employees = $this->service->employees();
        $foundEmp = function($emp) use ($id){
            return $emp['id'] === $id;
        };
        $found = array_filter($employees, $foundEmp);
        $this->assertCount(1, $found);
    }

    private function create()
    {

        $employee = $this->service->create([
            'employee_name' => 'Test',
            'employee_age' => 20,
            'employee_salary' => 20000,
            'profile_image' => ''
        ]);
        return $employee['id'];
    }

    public function testRemoveEmployee()
    {
        $id = $this->create();
        $service = new ApiService();
        $employees = $service->employees();
        $service->delete($id);

        $this->assertFalse(array_search($id, $employees));
    }
}
