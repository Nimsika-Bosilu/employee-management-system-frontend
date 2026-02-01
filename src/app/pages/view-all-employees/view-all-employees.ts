import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-view-all-employees',
  imports: [CommonModule,FormsModule,HttpClientModule,NgFor],
  templateUrl: './view-all-employees.html',
  styleUrl: './view-all-employees.css',
})
export class ViewAllEmployees implements OnInit {
public employees: any[] = [];
  
constructor(private http:HttpClient,private cdr: ChangeDetectorRef){
  
}
ngOnInit(): void {
  this.loadEmployeeDetails();
}
loadEmployeeDetails(){
   this.http.get<any[]>("http://localhost:8080/employee/get-all-employees",{ withCredentials: true }).subscribe((data)=>{
      this.employees=data;
      console.log(data);
      this.cdr.detectChanges();
   });
  }
}
