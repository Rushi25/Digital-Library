import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const adminGuard: CanActivateChildFn = (): Observable<boolean> => {
  const _snackBar = inject(MatSnackBar);
  const _router = inject(Router)
  return inject(AccountService).isAdmin$.pipe(
    map(isAdmin => {
      console.log('Admin guard triggered, idAdmin = ' + isAdmin);
      if(!isAdmin){
        _snackBar.open('You will need to login as Admin to access this resources', 'OK', { duration: 3000 })
        _router.navigate(['home'])
        return false;
      }
      return true;
    })
  )
};
