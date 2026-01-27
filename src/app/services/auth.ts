import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authURL = "http://localhost:8080//api/v1/auth/authenticate";

  public constructor(private http:HttpClient){}

  login(userData: any): Observable<any> {
    return this.http.post(this.authURL, userData);
  }


}
