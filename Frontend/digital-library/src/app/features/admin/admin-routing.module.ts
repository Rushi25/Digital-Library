import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
    title: 'Categories',
  },
  {
    path: 'category-item/:categoryId',
    loadChildren: () =>
      import('./category-item/category-item.module').then(
        (m) => m.CategoryItemModule
      ),
    title: 'Category Items',
  },
  {
    path: 'media-type',
    loadChildren: () =>
      import('./media-type/media-type.module').then((m) => m.MediaTypeModule),
    title: 'Media Types',
  },
  {
    path: 'content/:categoryId',
    loadChildren: () =>
      import('./content-add-edit/content-add-edit.module').then(
        (m) => m.ContentAddEditModule
      ),
    title: 'Content',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
