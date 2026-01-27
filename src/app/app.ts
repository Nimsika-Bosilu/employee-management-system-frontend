import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddEmployee } from './pages/add-employee/add-employee';
import { Header } from './pages/header/header';
import { ViewAllEmployees } from './pages/view-all-employees/view-all-employees';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddEmployee, Header, ViewAllEmployees],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('employee-management-system-frontend');
}
