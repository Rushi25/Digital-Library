import { Component } from '@angular/core';
import { AccountService } from './shared/services/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'digital-library';
  constructor(
    private authService: AccountService,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const jwt = this.authService.getJwt();
    if (jwt) {
      this.authService.refreshUser(jwt).subscribe({
        next: (_) => {},
        error: (_) => {
          this.authService.logout();
          this._snackBar.open('Session expired please login again.', 'OK');
        },
      });
    } else {
      this.authService.refreshUser(undefined).subscribe();
    }
  }
}
