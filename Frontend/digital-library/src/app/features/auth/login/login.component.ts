import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginModel } from '../../../api-client/api-client';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreService } from '../../../core/services/user-store.service';

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
    private readonly userService: UserStoreService) { }

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
          this.authService.storeToken(res.accessToken);
          this.authService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.authService.decodedToken();
          this.userService.setFullNameForStore(tokenPayload?.unique_name);
          this.userService.setRoleForStore(tokenPayload?.role);
        };
      },
      error: (err) => {
        this._snackBar.open(err, 'OK');
      }
    });
  }
}
