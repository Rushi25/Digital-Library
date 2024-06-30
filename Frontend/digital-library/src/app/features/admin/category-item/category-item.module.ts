import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryItemRoutingModule } from './category-item-routing.module';
import { CategoryItemComponent } from './category-item.component';
import { CategoryItemAddEditComponent } from './category-item-add-edit/category-item-add-edit.component';
import { CategoryItemDeleteComponent } from './category-item-delete/category-item-delete.component';
import { CategoryItemDetailComponent } from './category-item-detail/category-item-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    CategoryItemComponent,
    CategoryItemAddEditComponent,
    CategoryItemDeleteComponent,
    CategoryItemDetailComponent,
  ],
  imports: [
    CommonModule,
    CategoryItemRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [ provideNativeDateAdapter() ]
})
export class CategoryItemModule {}
