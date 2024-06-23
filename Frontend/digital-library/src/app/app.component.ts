import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NavbarComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'digital-library';
  constructor(private authService: AuthService,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router) { }

  ngOnInit(): void {
    const jwt = this.authService.getJwt()
    if (jwt) {
      this.authService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: _ => {
          this.authService.logout();
          this._snackBar.open('Session expired please login again.', 'OK');
        }
      });
    }
    else{
      this.authService.refreshUser(undefined).subscribe();
    }
  }
}
