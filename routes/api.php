<?php

Route::get('/employees', 'EmployeeController@index');
Route::post('/employees', 'EmployeeController@create');
Route::delete('/employees/{id}', 'EmployeeController@remove');
