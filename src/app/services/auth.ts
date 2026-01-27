import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authURL = "http://localhost:8080//api/v1/auth";

  public constructor(private http:HttpClient,private router:Router){}

  login(userData: any) {
    return this.http.post(`${this.authURL}/authenticate`, userData,{withCredentials:true});
  }
  logout(){
    return this.http.post
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

}
