import { Routes } from '@angular/router';
import { AddEmployee } from './pages/add-employee/add-employee';
import { ViewAllEmployees } from './pages/view-all-employees/view-all-employees';
import { Logging } from './pages/logging/logging';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {path: '', component: AddEmployee ,canActivate: [authGuard]},
    {path: 'add-employee', component: AddEmployee ,canActivate: [authGuard]},
    {path: 'get-all-employees', component: ViewAllEmployees,canActivate: [authGuard]},
    {path: 'login', component: Logging}
];
