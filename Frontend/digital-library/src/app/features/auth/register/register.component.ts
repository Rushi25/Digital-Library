import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterModel } from '../../../api-client/api-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private readonly authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  showHidePassword(event: MouseEvent){
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

  register(): void{
    const model: RegisterModel = this.registerForm.value;
    this.authService.register(model).subscribe({
      next: (res) => {
        this._snackBar.open(res, 'OK', { duration: 3000 });
      },
      error: (err) => {
        this._snackBar.open(err, 'OK');
      }
    });
  }
}
