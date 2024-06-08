import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { TokenModel } from '../../api-client/api-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 401) {
          let tokenModel = new TokenModel();
          let accessToken = inject(AuthService).getToken();
          let refreshToken = inject(AuthService).getRefreshToken();
          tokenModel.accessToken = accessToken ?? '';
          tokenModel.refreshToken = refreshToken ?? '';

          return inject(AuthService).refresh(tokenModel).pipe(
            switchMap((data: TokenModel) => {
              inject(AuthService).storeRefreshToken(data.refreshToken);
              inject(AuthService).storeToken(data.accessToken);
              req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${data.accessToken}`)
              });
              return next(req);
            }),
            catchError((err) => {
              return throwError(() => {
                inject(MatSnackBar).open('Token expired, Please login again..', 'OK');
                inject(Router).navigate(['login']);
              })
            })
          )
        } else if (event.status === 200) {
          return next(req);
        }
        return throwError(() => {
          inject(MatSnackBar).open('Token expired, Please login again..', 'OK');
          inject(Router).navigate(['login']);
        })
      }
    })
  )
};
