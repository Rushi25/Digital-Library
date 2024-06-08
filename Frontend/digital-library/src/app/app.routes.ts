import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent}
];
