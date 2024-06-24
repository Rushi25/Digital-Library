import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { UsersToCategoryComponent } from './features/admin/users-to-category/users-to-category.component';
import { CategoryComponent } from './features/admin/category/category.component';
import { MediaTypeComponent } from './features/admin/media-type/media-type.component';
import { CategoryAddEditComponent } from './features/admin/category/category-add-edit/category-add-edit.component';
import { CategoryDetailComponent } from './features/admin/category/category-detail/category-detail.component';
import { CategoryDeleteComponent } from './features/admin/category/category-delete/category-delete.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: RegisterComponent },
  { path: 'admin/categories', component: CategoryComponent },
  { path: 'admin/categories/add', component: CategoryAddEditComponent },
  { path: 'admin/categories/edit/:id', component: CategoryAddEditComponent },
  { path: 'admin/categories/details/:id', component: CategoryDetailComponent },
  { path: 'admin/userstocategory', component: UsersToCategoryComponent },
  { path: 'admin/mediatypes', component: MediaTypeComponent },
];
