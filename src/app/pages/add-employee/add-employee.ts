import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule,HttpClientModule,CommonModule,NgIf],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {

  public employee ={
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    departmentId: undefined,
    roleId:undefined
  }

  

  constructor(private http:HttpClient){
    
  }
  addEmployee(){
    const headers =new HttpHeaders({
'Content-Type' : 'Application/json',
'Authorization': 'Basic c2FtYW46MTIZNA == '
  });
    this.http.post("http://localhost:8080/employee/add",this.employee,{headers}).subscribe((data)=>{
      console.log(data);
    });
  }

}
