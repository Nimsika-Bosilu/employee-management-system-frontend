import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, map, of, BehaviorSubject, tap } from 'rxjs';
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

    public constructor(private http: HttpClient, private router: Router) { }

    login(userData: any) {
        return this.http.post(`${this.authURL}/authenticate`, userData, { withCredentials: true, responseType: 'text' as 'json' }).pipe(
            tap(() => {
                this.isLoggingInSubject.next(true);
            }

            )
        );
    }

    logout() {
        return this.http.post(`${this.authURL}/logout`, {}, { withCredentials: true }).subscribe(() => {
            this.isLoggingInSubject.next(false);
            this.router.navigate(['/login']);
        }, error => {
            console.error("logout error :", error)
        });
    }
    checkLoginStatus() {
        return this.http.get(`${this.authURL}/user-profile`, { withCredentials: true }).pipe(
            map((userData) => {
                this.currentUserSubject.next(userData);
                this.isLoggingInSubject.next(true);

                return true;
            }), catchError(() => {
                this.currentUserSubject.next(null);
                this.isLoggingInSubject.next(false);
                return of(false);
            })
        );
    }
    getUserRole(): string {
        return this.currentUserSubject.value ? this.currentUserSubject.value.role : '';
    }
    getAllUsers() {
        return this.http.get<any[]>(`${this.authURL}/all-users`, { withCredentials: true });
    }

    toggleUserStatus(id: number) {
        return this.http.put(`${this.authURL}/toggle-status/${id}`, {}, { withCredentials: true, responseType: 'text' as 'json' });
    }

    updateUser(user: any) {
        return this.http.put(`${this.authURL}/update-user`, user, { withCredentials: true, responseType: 'text' as 'json' });
    }
    registerUser(userData: any) {
        return this.http.post(`${this.authURL}/register`, userData, {
            withCredentials: true,
            responseType: 'text'
        });
    }
    isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.role === 'admin';
  }
  getAvailableEmployees() {
    return this.http.get<any[]>(`${this.authURL}/available-employees`, { withCredentials: true });
}
}
