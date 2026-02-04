import { Routes } from '@angular/router';
import { AddEmployee } from './features/employee/add-employee/add-employee';
import { ViewAllEmployees } from './features/employee/view-all-employees/view-all-employees';
import { Logging } from './features/auth/logging';
import { authGuard } from './core/guards/auth.guard';
import { ManageAccountsComponent } from './features/admin/manage-accounts/manage-accounts';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Faq } from './features/faq/faq';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'about', component: About},
    {path: 'faq', component: Faq},
    {path: 'add-employee', component: AddEmployee ,canActivate: [authGuard]},
    {path: 'view-all-employees', component: ViewAllEmployees,canActivate: [authGuard]},
    {path: 'login', component: Logging},
    {path: 'manage-accounts', component: ManageAccountsComponent,canActivate: [authGuard]},
    {path: '**', redirectTo: 'home'}

];
