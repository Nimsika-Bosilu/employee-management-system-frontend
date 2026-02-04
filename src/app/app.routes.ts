import { Routes } from '@angular/router';
import { AddEmployee } from './features/employee/add-employee/add-employee';
import { ViewAllEmployees } from './features/employee/view-all-employees/view-all-employees';
import { Logging } from './features/auth/logging';
import { authGuard } from './core/guards/auth.guard';
import { ManageAccountsComponent } from './features/admin/manage-accounts/manage-accounts';

export const routes: Routes = [
    {path: '', component: AddEmployee ,canActivate: [authGuard]},
    {path: 'add-employee', component: AddEmployee ,canActivate: [authGuard]},
    {path: 'get-all-employees', component: ViewAllEmployees,canActivate: [authGuard]},
    {path: 'login', component: Logging},
    {path: 'manage-accounts', component: ManageAccountsComponent,canActivate: [authGuard]},
    {path: '**', redirectTo: 'login'}

];
