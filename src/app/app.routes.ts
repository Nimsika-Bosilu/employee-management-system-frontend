import { Routes } from '@angular/router';
import { AddEmployee } from './pages/add-employee/add-employee';
import { ViewAllEmployees } from './pages/view-all-employees/view-all-employees';
import { Logging } from './pages/logging/logging';

export const routes: Routes = [
    {path: '', component: AddEmployee},
    {path: 'add-employee', component: AddEmployee},
    {path: 'get-all-employees', component: ViewAllEmployees},
    {path: 'logging', component: Logging}
];
