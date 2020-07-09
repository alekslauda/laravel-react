<?php

namespace App\Actions\Employees;

use App\Services\ApiService as Api;
use Illuminate\Support\Facades\Storage;

class EmployeesAction {


    private $apiService;

    private $employees;

    public function __construct(Api $service)
    {
        $this->apiService = $service;
    }

    public function all(EmployeesActionDTO $dto)
    {
        $this->employees = $this->apiService->employees();

        if($dto->term) {
            $this->search($dto->term);
        }

        if ($dto->sort) {
            $this->sort($dto->sort);
        }

        $data = [];

        foreach($this->employees as $employee) {

            if($employee['profile_image']) {
                $employee['profile_image'] = asset(Storage::disk('avatars')->url($employee['profile_image']));
            }
            $data[] = $employee;
        }

        return $data;
    }

    private function search($keyword)
    {
        $this->employees = array_values(array_filter($this->employees, function($emp) use ($keyword){
            return strpos(strtolower($emp['employee_name']), strtolower($keyword)) !== false;
        }));
    }

    private function sort($direction)
    {
        if ($direction === 'asc') {
            usort($this->employees, function ($item1, $item2) {
                return $item1['employee_age'] <=> $item2['employee_age'];
            });
        }

        if ($direction === 'desc') {
            usort($this->employees, function ($item1, $item2) {
                return $item2['employee_age'] <=> $item1['employee_age'];
            });
        }
    }


}

?>
