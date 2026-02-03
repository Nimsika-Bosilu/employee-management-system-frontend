import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Common } from '../../common';
import { Department } from '../../models/department';
import { Role } from '../../models/role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule, HttpClientModule, CommonModule, NgIf],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnInit {

  @ViewChild('empForm') empForm!: NgForm;

  public employee = {
    firstName: null,
    lastName: null,
    email: null,
    departmentId: null,
    roleId: null
  };

  public departmentList: Department[] = [];
  public roleList: Role[] = [];

  constructor(private http: HttpClient, private common: Common) {}

  ngOnInit(): void {
    this.common.getAllDepartments().subscribe(data => {
      this.departmentList = data;
    });

    this.common.getAllRoles().subscribe(data => {
      this.roleList = data;
    });
  }

  addEmployee() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add this employee?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post("http://localhost:8080/employee/add", this.employee, { withCredentials: true })
          .subscribe({
            next: (data) => {
              Swal.fire(
                'Added!',
                'Employee has been added successfully.',
                'success'
              );
              this.resetForm();
            },
            error: (err) => {
              console.error(err);
              Swal.fire(
                'Error!',
                'Failed to add employee. Please check the details.',
                'error'
              );
            }
          });
      }
    });
  }

  resetForm() {
    if (this.empForm) {
      this.empForm.resetForm();
    }
  }
}