import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieRequest = req.clone({
    withCredentials:true
  });
  return next(cookieRequest);
};
