import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (): boolean => {
  if (inject(AccountService).isLoggedIn()) {
    console.log('Logged in')
    return true;
  } else {
    inject(Router).navigate(['home']);
    console.log('Not logged in')
    return false;
  }
};
