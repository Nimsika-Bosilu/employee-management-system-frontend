import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      
      if (error.status === 401) {
        console.log('Session Expired!');
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Please login again.',
          timer: 3000,
          showConfirmButton: false
        });
        
        router.navigate(['/login']); 
      }

      else if (error.status === 403) {
        console.log('Permission Denied!');
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have permission to view this page.',
        });
        
        +
        router.navigate(['/']); 
      }

      return throwError(() => error);
    })
  );
};