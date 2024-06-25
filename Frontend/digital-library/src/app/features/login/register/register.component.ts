import { Component } from '@angular/core';
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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AccountService,
    private _snackBar: MatSnackBar,
    private router: Router
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
      console.log('Form submitted:', this.registerForm.value);
      this.register();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  register(): void {
    const model: RegisterModel = this.registerForm.value;
    this.authService.register(model).subscribe({
      next: (res) => {
        this._snackBar.open(res, 'OK', { duration: 3000 });
        this.router.navigate(['login']);
      },
      error: (err) => {
        this._snackBar.open(err, 'OK');
      },
    });
  }
}