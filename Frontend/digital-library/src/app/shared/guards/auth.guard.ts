import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AccountService).isLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  };
};
