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
  
  // New User Form Data
  newUser = { username: '', password: '', role: 'USER' };

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  registerUser() {
    this.authService.registerUser(this.newUser).subscribe({
      next: () => {
        Swal.fire('Success', 'User Created', 'success');
        this.newUser = { username: '', password: '', role: 'USER' };
        this.loadUsers();
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
    this.selectedUser = { ...user, password: '' }; // Clear password field for security
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