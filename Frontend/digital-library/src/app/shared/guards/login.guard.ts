import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (): boolean => {
  if (inject(AccountService).isLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['home']);
    return false;
  }
};
