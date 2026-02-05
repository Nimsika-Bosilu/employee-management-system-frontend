import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef ගේන්න
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
    user_role: 'hr_manager', 
    employeeId: null ,
    isActive: true
  };

  constructor(private authService: Auth, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAvailableEmployees();
  }

  loadAvailableEmployees() {
    this.authService.getAvailableEmployees().subscribe(data => {
      this.availableEmployees = data;
      this.cd.detectChanges(); 
    });
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
      this.cd.detectChanges(); 
    });
  }

  registerUser() {
    this.authService.registerUser(this.newUser).subscribe({
      next: () => {
        Swal.fire('Success', 'User Created and Linked!', 'success');
        
       
        this.newUser = { username: '', password: '', user_role: 'hr_manager', employeeId: null,isActive: true };
        
        setTimeout(() => {
            this.loadUsers();
            this.loadAvailableEmployees(); 
        }, 500); 
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to create user', 'error');
      }
    });
  }

  toggleStatus(user: any) {
    this.authService.toggleUserStatus(user.id).subscribe({
      next: (msg) => {
        const status = user.active ? 'Disabled' : 'Activated';
        Swal.fire('Updated', `User has been ${status}`, 'success');
        
        setTimeout(() => {
            this.loadUsers();
        }, 300);
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
        
        setTimeout(() => {
            this.loadUsers();
        }, 300);

        const closeBtn = document.getElementById('closeModalBtn');
        if(closeBtn) closeBtn.click();
      },
      error: () => Swal.fire('Error', 'Update Failed', 'error')
    });
  }
}