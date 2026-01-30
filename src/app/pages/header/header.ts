import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule,NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  isLoggedIn:boolean = false;
  userData: any = null;
  constructor(private auth:Auth){}
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(sta =>{
      this.isLoggedIn = sta;
    });
    this.auth.currentUser$.subscribe(data=>{
      this.userData = data;
    });
  }
  logout(){
    this.auth.logout();
  }
}
