import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserModel, LoginModel } from '../../api-client/api-client';
import { AccountService } from '../../shared/services/account.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AccountService,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) {
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: UserModel | null) => {
        if (user) {
          this.router.navigate(['home']);
        }
      },
    });
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  showHidePassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login() {
    this.loaderService.show();
    const model: LoginModel = this.loginForm.value;
    this.authService.logIn(model).subscribe({
      next: (res) => {
        this._snackBar.open('Login successful', 'OK', { duration: 3000 });
        if (res != null) {
          this.loginForm.reset();
          this.authService.setUser(res);
          this.router.navigate(['dashboard']);
          this.loaderService.hide();
        }
      },
      error: (err) => {
        this._snackBar.open(err, 'OK');
        this.loaderService.hide();
      },
    });
  }
}
