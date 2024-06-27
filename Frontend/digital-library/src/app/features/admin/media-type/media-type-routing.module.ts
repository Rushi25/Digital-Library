import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaTypeComponent } from './media-type.component';

const routes: Routes = [{ path: '', component: MediaTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaTypeRoutingModule { }
