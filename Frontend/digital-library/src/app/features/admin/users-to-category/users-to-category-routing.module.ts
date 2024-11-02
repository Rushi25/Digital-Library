import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersToCategoryComponent } from './users-to-category.component';

const routes: Routes = [{ path: '', component: UsersToCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersToCategoryRoutingModule { }
