import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryItemComponent } from './category-item.component';
import { CategoryItemAddEditComponent } from './category-item-add-edit/category-item-add-edit.component';
import { CategoryItemDetailComponent } from './category-item-detail/category-item-detail.component';

const routes: Routes = [
  { path: '', component: CategoryItemComponent },
  { path: 'add', component: CategoryItemAddEditComponent, title: 'New Category Item' },
  { path: 'edit/:itemId', component: CategoryItemAddEditComponent, title: 'Edit Category Item' },
  { path: 'details/:itemId', component: CategoryItemDetailComponent, title: 'Category Item - Details' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryItemRoutingModule {}
