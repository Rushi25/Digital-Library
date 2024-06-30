import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentAddEditRoutingModule } from './content-add-edit-routing.module';
import { ContentAddEditComponent } from './content-add-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ContentAddEditComponent
  ],
  imports: [
    CommonModule,
    ContentAddEditRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class ContentAddEditModule { }
