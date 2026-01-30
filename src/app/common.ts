import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './models/department';
import { Role } from './models/role';
@Injectable({
  providedIn: 'root',
})
export class Common {
  private baseURL = "http://localhost:8080/common"; // අපි හදපු Controller path එක

  constructor(private http: HttpClient) { }

  // Departments ගේනවා
  getAllDepartments() {
    return this.http.get<Department[]>(`${this.baseURL}/departments`);
  }

  // Roles ගේනවා
  getAllRoles() {
    return this.http.get<Role[]>(`${this.baseURL}/roles`);
  }
}
