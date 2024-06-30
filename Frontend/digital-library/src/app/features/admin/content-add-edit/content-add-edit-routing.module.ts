import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAddEditComponent } from './content-add-edit.component';

const routes: Routes = [
  {
    path: ':categoryItemId/add',
    component: ContentAddEditComponent,
    title: 'New Content',
  },
  {
    path: ':categoryItemId/edit/:contentId',
    component: ContentAddEditComponent,
    title: 'Edit Content',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentAddEditRoutingModule {}
