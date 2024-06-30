import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaTypeRoutingModule } from './media-type-routing.module';
import { MediaTypeComponent } from './media-type.component';
import { MediaTypeAddEditComponent } from './media-type-add-edit/media-type-add-edit.component';
import { MediaTypeDetailComponent } from './media-type-detail/media-type-detail.component';
import { MediaTypeDeleteComponent } from './media-type-delete/media-type-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    MediaTypeComponent,
    MediaTypeAddEditComponent,
    MediaTypeDetailComponent,
    MediaTypeDeleteComponent
  ],
  imports: [
    CommonModule,
    MediaTypeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class MediaTypeModule { }
