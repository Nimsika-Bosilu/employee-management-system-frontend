import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Common } from '../../common';
import { Department } from '../../models/department';
import { Role } from '../../models/role';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule,HttpClientModule,CommonModule,NgIf],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})

export class AddEmployee implements OnInit {

  public employee ={
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    departmentId: undefined,
    roleId:undefined
  }
  public departmentList: Department[] = [];
  public roleList:Role[] = [];

  constructor(private http:HttpClient,private common:Common){}

  ngOnInit(): void {
    this.common.getAllDepartments().subscribe(data => {
      this.departmentList = data;
    });

    
    this.common.getAllRoles().subscribe(data => {
      this.roleList = data;
    });
  }
  addEmployee (){
    this.http.post("http://localhost:8080/employee/add",this.employee).subscribe((data)=>{
      console.log(data);
    });
  }

}
