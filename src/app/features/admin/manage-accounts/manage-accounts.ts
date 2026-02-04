import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-accounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-accounts.html'
})
export class ManageAccountsComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = {};
  availableEmployees: any[] = [];

 newUser = { 
    username: '', 
    password: '', 
    role: 'hr_manager', 
    employeeId: null 
  };

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAvailableEmployees();
  }
  loadAvailableEmployees() {
    this.authService.getAvailableEmployees().subscribe(data => {
      this.availableEmployees = data;
    });
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  registerUser() {
    this.authService.registerUser(this.newUser).subscribe({
      next: () => {
        Swal.fire('Success', 'User Created and Linked!', 'success');
        this.newUser = { username: '', password: '', role: 'hr_manager', employeeId: null };
        this.loadUsers();
        this.loadAvailableEmployees(); 
      },
      error: () => Swal.fire('Error', 'Failed to create user', 'error')
    });
  }

  toggleStatus(user: any) {
    this.authService.toggleUserStatus(user.id).subscribe({
      next: (msg) => {
        const status = user.active ? 'Disabled' : 'Activated';
        Swal.fire('Updated', `User has been ${status}`, 'success');
        this.loadUsers();
      }
    });
  }

  setSelectedUser(user: any) {
    this.selectedUser = { ...user, password: '' }; 
  }

  updateUser() {
    this.authService.updateUser(this.selectedUser).subscribe({
      next: () => {
        Swal.fire('Success', 'User Details Updated', 'success');
        this.loadUsers();
        const closeBtn = document.getElementById('closeModalBtn');
        if(closeBtn) closeBtn.click();
      },
      error: () => Swal.fire('Error', 'Update Failed', 'error')
    });
  }
}