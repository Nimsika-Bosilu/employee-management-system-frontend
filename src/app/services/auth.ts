import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,map,of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authURL = "http://localhost:8080/api/v1/auth";

  public constructor(private http:HttpClient,private router:Router){}

  login(userData: any) {
    return this.http.post(`${this.authURL}/authenticate`, userData,{withCredentials:true,responseType: 'text' as 'json'});
  }
  logout(){
    return this.http.post(`${this.authURL}/logout`,{},{withCredentials:true}).subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }
  checkLoginStatus(){
    return this.http.get(`${this.authURL}/user-profile`,{withCredentials:true}).pipe(
      map(()=>true),catchError(()=>of(false))
    );
  }

}
