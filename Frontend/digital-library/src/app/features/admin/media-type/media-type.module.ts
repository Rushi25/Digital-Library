import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaTypeRoutingModule } from './media-type-routing.module';
import { MediaTypeComponent } from './media-type.component';
import { MediaTypeAddEditComponent } from './media-type-add-edit/media-type-add-edit.component';
import { MediaTypeDetailComponent } from './media-type-detail/media-type-detail.component';
import { MediaTypeDeleteComponent } from './media-type-delete/media-type-delete.component';


@NgModule({
  declarations: [
    MediaTypeComponent,
    MediaTypeAddEditComponent,
    MediaTypeDetailComponent,
    MediaTypeDeleteComponent
  ],
  imports: [
    CommonModule,
    MediaTypeRoutingModule
  ]
})
export class MediaTypeModule { }
