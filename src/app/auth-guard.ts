import { CanActivateFn ,Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './services/auth';
import { map,tap } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);
  const localToken = localStorage.getItem('token');

  
  
  return authService.checkLoginStatus().pipe(
    tap((isLogging)=>{
      if(!isLogging){
        console.log("Cookie Expired or Not Logged In. Redirecting to Login...");
        router.navigate(['/login']);
      }
    })
  );

};
