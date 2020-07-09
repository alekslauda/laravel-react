<?php

namespace App\Actions\Employees;
use Illuminate\Http\Request;

class EmployeesActionDTO {

    public $term;

    public $sort;

    public function __construct($term, $sort)
    {
        $this->term = $term;
        $this->sort = $sort;
    }

    static function fromRequest(Request $request)
    {
        return new self($request->get('term'), $request->get('sort'));
    }
}

?>
