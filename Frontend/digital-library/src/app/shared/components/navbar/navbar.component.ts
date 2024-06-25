import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAdmin: boolean = false;

  constructor(public authService: AccountService) {
    this.isAdmin = authService.isAdminUser();
  }

  logout() {
    this.authService.logout();
  }
}
