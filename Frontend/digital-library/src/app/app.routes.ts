import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CategoriesComponent } from './features/admin/categories/categories.component';
import { UsersToCategoryComponent } from './features/admin/users-to-category/users-to-category.component';
import { MediaTypesComponent } from './features/admin/media-types/media-types.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/signup', component: RegisterComponent },
    { path: 'admin/categories', component: CategoriesComponent },
    { path: 'admin/userstocategory', component: UsersToCategoryComponent },
    { path: 'admin/mediatypes', component: MediaTypesComponent }
];