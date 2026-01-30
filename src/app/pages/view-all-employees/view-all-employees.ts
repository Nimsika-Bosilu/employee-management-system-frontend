import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-employees',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './view-all-employees.html',
  styleUrl: './view-all-employees.css',
})
export class ViewAllEmployees {
public employees: any[] = [];
  
constructor(private http:HttpClient){
  this.loadEmployeeDetails();
}

loadEmployeeDetails(){
   this.http.get<any[]>("http://localhost:8080/employee/get-all-employees",{ withCredentials: true }).subscribe((data)=>{
      this.employees=data;
      console.log(data);
   });
  }
}
