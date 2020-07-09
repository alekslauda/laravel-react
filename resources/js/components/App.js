import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './home/Home';
import Employees from './employees/Employees';
import CreateEmployee from './employees/create-employee/CreateEmployee';


const app = (
    <BrowserRouter>
        <Switch>
            <Route path="/employees" component={Employees} />
            <Route path="/create-employee" component={CreateEmployee} />
            <Route path="/" exact component={Home} />
        </Switch>
    </BrowserRouter>
);

if (document.getElementById('app')) {
    ReactDOM.render(app, document.getElementById('app'));
}
