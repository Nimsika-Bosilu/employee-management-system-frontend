import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from './services/auth';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const router = inject(Router);
 const authService = inject(Auth);
  const cookieRequest = req.clone({
    withCredentials:true
  });
  return next(cookieRequest).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status === 403 || error.status == 401){
        console.log("Cookie Expired");
        authService.logout();
      }
      return throwError(()=>error);
    }
    )
  );
  
};
