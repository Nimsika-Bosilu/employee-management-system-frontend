import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 

  return next(req).pipe(
    catchError((error) => {
      
      if (error.status === 401 || error.status === 403) {
        
        console.log('Session Expired or Unauthorized!');

        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Please login again to continue.',
          timer: 3000,
          showConfirmButton: false
        });

        router.navigate(['/logging']);
      }

      return throwError(() => error);
    })
  );
};