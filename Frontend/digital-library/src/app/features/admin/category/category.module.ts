import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryAddEditComponent,
    CategoryDeleteComponent,
    CategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class CategoryModule {}
