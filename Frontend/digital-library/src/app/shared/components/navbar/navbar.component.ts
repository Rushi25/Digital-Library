import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public authService: AccountService) {
  }

  logout() {
    this.authService.logout();
  }
}
