import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaTypeRoutingModule } from './media-type-routing.module';
import { MediaTypeComponent } from './media-type.component';


@NgModule({
  declarations: [
    MediaTypeComponent
  ],
  imports: [
    CommonModule,
    MediaTypeRoutingModule
  ]
})
export class MediaTypeModule { }
