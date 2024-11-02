import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersToCategoryRoutingModule } from './users-to-category-routing.module';
import { UsersToCategoryComponent } from './users-to-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [UsersToCategoryComponent],
  imports: [
    CommonModule,
    UsersToCategoryRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule
  ],
})
export class UsersToCategoryModule {}
