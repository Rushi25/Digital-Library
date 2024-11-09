import { Component, OnInit } from '@angular/core';
import { ChooseCoursesService } from './choose-courses.service';
import { UserSelectedCategory } from '../../../api-client/api-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectionListChange } from '@angular/material/list';
import { LoaderService } from '../../../shared/services/loader.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-choose-courses',
  templateUrl: './choose-courses.component.html'
})
export class ChooseCoursesComponent implements OnInit {
  userSelectedCategory: UserSelectedCategory[] = [];
  originalUserSelectedCategory: UserSelectedCategory[] = [];
  saveDisabled = true;

  constructor(
    private readonly chooseCourseService: ChooseCoursesService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.loadCourses();
  }

  loadCourses() {
    this.chooseCourseService.getUserCoursesToChoose().subscribe({
      next: (res: UserSelectedCategory[]) => {
        if (res.length > 0) {
          this.userSelectedCategory = res;
          this.originalUserSelectedCategory = _.cloneDeep(res);
          this.loaderService.hide();
        } else {
          this.goBack();
        }
      },
      error: (err: string) => {
        this._snackBar.open(err, 'OK', { duration: 3000 });
        this.goBack();
      },
    });
  }

  onCourseCheckboxChange($event: MatSelectionListChange) {
    $event.options.forEach((a) => {
      this.userSelectedCategory[a.value].isSelected = !this.userSelectedCategory[a.value].isSelected;
    });
    this.saveDisabled = _.isEqual(this.userSelectedCategory, this.originalUserSelectedCategory);
  }

  save() {
    this.loaderService.show();
    this.chooseCourseService.saveUserCourses(this.userSelectedCategory).subscribe({
      next: () => {
        this._snackBar.open('Data saved successfully.', 'OK', {duration:3000});
        this.loadCourses();
      },
      error: (err: string) => {
        this._snackBar.open(err, 'OK', {duration:3000});
        this.loadCourses();
      }
    });
  }

  goBack() {
    this.loaderService.hide();
    this._router.navigate(['dashboard']);
  }
}
