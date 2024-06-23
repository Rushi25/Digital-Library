import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginModel, UserModel } from '../../../api-client/api-client';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = true;

  constructor(private readonly fb: FormBuilder, 
    private readonly authService: AuthService, 
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router) { 
      this.authService.user$.pipe(take(1)).subscribe({
        next: (user: UserModel | null) => {
          if(user){
            this.router.navigate(['home']);
          }
        }
      })
    }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  showHidePassword(event: MouseEvent){
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
    const model: LoginModel = this.loginForm.value;
    this.authService.logIn(model).subscribe({
      next: (res) => {
        this._snackBar.open("Login successful", 'OK', { duration: 3000 });
        if(res != null) {
          this.loginForm.reset();
          this.authService.setUser(res)
          this.router.navigate(['home']);
        };
      },
      error: (err) => {
        this._snackBar.open(err, 'OK');
      }
    });
  }
}
