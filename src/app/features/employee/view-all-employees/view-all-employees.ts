import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Department } from '../../../models/department';
import { Role } from '../../../models/role';
import { Common } from '../../../core/services/common';
import { EmployeeService } from '../services/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-employees',
  imports: [CommonModule, FormsModule, NgFor], 
  templateUrl: './view-all-employees.html',
  styleUrl: './view-all-employees.css',
})
export class ViewAllEmployees implements OnInit {
  
  public employee = {
    firstName: null,
    lastName: null,
    email: null,
    departmentId: null,
    roleId: null
  };
  
  public departmentList: Department[] = [];
  public roleList: Role[] = [];
  public employees: any[] = [];
  public selectedEmployee: any = {};

  constructor(
    private employeeService: EmployeeService, 
    private cdr: ChangeDetectorRef, 
    private common: Common
  ) { }

  ngOnInit(): void {
    this.loadEmployeeDetails();
    
    this.common.getAllDepartments().subscribe(data => {
      this.departmentList = data;
    });

    this.common.getAllRoles().subscribe(data => {
      this.roleList = data;
    });
  }

  loadEmployeeDetails() {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.employees = data;
      this.cdr.detectChanges();
    });
  }

  getDepartmentName(id: any): string {
    const dep = this.departmentList.find(d => d.id === id);
    return dep ? dep.name : 'Unknown';
  }

  getRoleName(id: any): string {
    const role = this.roleList.find(r => r.id === id);
    return role ? role.name : 'Unknown';
  }

  setSelectedEmployee(emp: any) {
    this.selectedEmployee = { ...emp };
    if (!this.selectedEmployee.departmentId) this.selectedEmployee.departmentId = undefined;
    if (!this.selectedEmployee.roleId) this.selectedEmployee.roleId = undefined;
  }

  saveUpdatedEmployee() {
    Swal.fire({
      title: "Do you want to save changes?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.employeeService.updateEmployee(this.selectedEmployee)
          .subscribe({
            next: (res) => {
              Swal.fire("Saved!", "Employee details updated successfully.", "success");
              this.loadEmployeeDetails(); 

              const closeBtn = document.getElementById('modalCloseBtn');
              if(closeBtn) {
                closeBtn.click();
              }
            },
            error: (err) => {
              console.error(err);
              Swal.fire("Error!", "Failed to update employee.", "error");
            }
          });
      }
    });
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.employeeService.deleteEmployee(id)
          .subscribe({
            next: (response) => {
              Swal.fire({
                title: "Deleted!",
                text: "Employee has been deleted.",
                icon: "success"
              });
              this.loadEmployeeDetails();
            },
            error: (err) => {
              console.error(err);
              Swal.fire({
                title: "Error!",
                text: "Failed to delete employee.",
                icon: "error"
              });
            }
          });
      }
    });
  }
}
