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
import { UserModel, RegisterModel } from '../../../api-client/api-client';
import { AccountService } from '../../../shared/services/account.service';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  showHidePassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      this.register();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  register(): void {
    this.loaderService.show();
    const model: RegisterModel = this.registerForm.value;
    this.authService.register(model).subscribe({
      next: (res) => {
        this._snackBar.open(res, 'OK', { duration: 3000 });
        this.router.navigate(['login']);
        this.loaderService.hide();
      },
      error: (err) => {
        this._snackBar.open(err, 'OK');
        this.loaderService.hide();
      },
    });
  }
}
