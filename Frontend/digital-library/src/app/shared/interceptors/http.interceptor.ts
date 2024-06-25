import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AccountService).getJwt();
  if (jwt) {
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + jwt
      }
    });
  }
  return next(req);
};
