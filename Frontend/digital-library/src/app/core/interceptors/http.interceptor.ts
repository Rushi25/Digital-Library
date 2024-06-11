import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).getJwt();
  if (jwt) {
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + jwt
      }
    });
  }
  return next(req);
};
