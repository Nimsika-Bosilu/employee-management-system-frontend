import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/employee";

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-all-employees`, { withCredentials: true });
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, employee, { withCredentials: true });
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, employee, { withCredentials: true });
  }

  deleteEmployee(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { withCredentials: true, responseType: 'text' });
  }
}