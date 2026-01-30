import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './models/department';
import { Role } from './models/role';
@Injectable({
  providedIn: 'root',
})
export class Common {
  private baseURL = "http://localhost:8080/common"; 

  constructor(private http: HttpClient) { }

 
  getAllDepartments() {
    return this.http.get<Department[]>(`${this.baseURL}/departments`);
  }

  
  getAllRoles() {
    return this.http.get<Role[]>(`${this.baseURL}/roles`);
  }
}
