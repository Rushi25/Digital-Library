import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaTypeComponent } from './media-type.component';
import { MediaTypeAddEditComponent } from './media-type-add-edit/media-type-add-edit.component';
import { MediaTypeDetailComponent } from './media-type-detail/media-type-detail.component';

const routes: Routes = [
  { path: '', component: MediaTypeComponent },
  {
    path: 'add',
    component: MediaTypeAddEditComponent,
    title: 'New Media type',
  },
  { path: 'edit/:mediaTypeId',
    component: MediaTypeAddEditComponent,
    title: 'Update Media type',
  },
  {
    path: 'details',
    component: MediaTypeDetailComponent,
    title: 'Media type - Details',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaTypeRoutingModule {}
