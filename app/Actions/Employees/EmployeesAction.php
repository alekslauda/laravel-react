<?php

namespace App\Actions\Employees;

use App\Services\ApiService as Api;

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

        return $this->employees;
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
