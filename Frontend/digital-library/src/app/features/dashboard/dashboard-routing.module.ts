import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChooseCoursesComponent } from './choose-courses/choose-courses.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'choose-courses', component: ChooseCoursesComponent, title: 'Choose courses' },
  {
    path: 'content/:categoryItemId',
    loadChildren: () =>
      import('./content/content.module').then((m) => m.ContentModule),
    title: 'Content'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
