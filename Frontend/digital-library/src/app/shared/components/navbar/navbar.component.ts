import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncPipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    TitleCasePipe,
    NgTemplateOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isAdmin: boolean = false;

  constructor(public authService: AuthService) {
    this.isAdmin = authService.isAdminUser();
  }

  logout() {
    this.authService.logout();
  }
}
