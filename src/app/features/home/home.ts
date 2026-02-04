import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features = [
    {
      icon: 'bi-people-fill',
      title: 'Employee Management',
      description: 'Add, edit and manage employee records easily.'
    },
    {
      icon: 'bi-building',
      title: 'Department & Roles',
      description: 'Organize employees by departments and roles.'
    },
    {
      icon: 'bi-shield-lock',
      title: 'Secure Login',
      description: 'Protected access with authentication system.'
    }
  ];
}
