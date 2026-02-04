import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth'; 

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, NgIf],
  templateUrl: './header.html', 
  styleUrl: './header.css',
})
export class Header implements OnInit {
  
  isLoggedIn: boolean = false;
  userData: any = null;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
   
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.auth.currentUser$.subscribe(data => {
      this.userData = data;
      console.log("Current User Role:", this.userData?.role); 
    });
  }

  logout() {
    this.auth.logout();
  }
}