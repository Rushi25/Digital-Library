import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'add', component: CategoryAddEditComponent, title: 'New Category' },
  { path: 'edit/:categoryId', component: CategoryAddEditComponent, title: 'Edit Category' },
  { path: 'details/:categoryId', component: CategoryDetailComponent, title: 'Category - Details' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
