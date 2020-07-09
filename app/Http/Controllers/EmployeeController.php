<?php

namespace App\Http\Controllers;

use App\Actions\Employees\EmployeesAction;
use App\Actions\Employees\EmployeesActionDTO;
use App\Services\ApiService;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;


class EmployeeController extends BaseController
{

    public function index(EmployeesAction $action, Request $request)
    {
        $dto = EmployeesActionDTO::fromRequest($request);
        return response()->json($action->all($dto), 200);
    }

    public function create(Request $request, ApiService $service)
    {
        return response()->json($service->create($request->all()), 200);
    }

    public function remove($id, ApiService $service)
    {
        return response()->json($service->delete($id), 200);
    }
}
