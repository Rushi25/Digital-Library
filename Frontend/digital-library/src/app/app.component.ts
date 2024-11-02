import { Component, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'digital-library';

  constructor(
    private readonly authService: AccountService,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    public readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const jwt = this.authService.getJwt();
    if (jwt) {
      this.authService.refreshUser(jwt).subscribe({
        error: () => {
          this.authService.logout();
          this._snackBar.open('Session expired please login again.', 'OK');
        },
      });
    } else {
      this.authService.refreshUser(undefined).subscribe();
    }
  }
}
