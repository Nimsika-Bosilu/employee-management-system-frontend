import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,map,of ,BehaviorSubject,tap} from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authURL = "http://localhost:8080/api/v1/auth";
  private isLoggingInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggingInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public constructor(private http:HttpClient,private router:Router){}

  login(userData: any) {
    return this.http.post(`${this.authURL}/authenticate`, userData,{withCredentials:true,responseType: 'text' as 'json'}).pipe(
      tap(()=>{
        this.isLoggingInSubject.next(true);
      }

      )
    );
  }

  logout(){
    return this.http.post(`${this.authURL}/logout`,{},{withCredentials:true}).subscribe(()=>{
      this.isLoggingInSubject.next(false);
      this.router.navigate(['/login']);
    },error=>{
      console.error("logout error :",error)
    });
  }
  checkLoginStatus(){
    return this.http.get(`${this.authURL}/user-profile`,{withCredentials:true}).pipe(
      map((userData)=>{
        this.currentUserSubject.next(userData);
        this.isLoggingInSubject.next(true);
        
        return true;
      }),catchError(()=>{
        this.currentUserSubject.next(null);
        this.isLoggingInSubject.next(false);
        return of(false);
      })
    );
  }
  getUserRole(): string {
    return this.currentUserSubject.value ? this.currentUserSubject.value.role : '';
  }

}
