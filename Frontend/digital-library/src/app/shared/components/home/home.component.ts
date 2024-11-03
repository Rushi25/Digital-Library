import { Component, ElementRef, OnInit } from '@angular/core';
import { Category } from '../../../api-client/api-client';
import { HomeService } from '../../services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  courses: Category[] = [];

  constructor(
    private readonly homeService: HomeService,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  } 

  loadCourses() {
    this.homeService.getCategories().subscribe({
      next: (rsp: Category[]) => {
        this.courses = rsp;
      },
      error: () => {
        this._snackBar.open(
          'Something went wrong while getting courses',
          'OK',
          { duration: 3000 }
        );
      },
    });
  }

  cardButtonClick() {
    this.router.navigate(['login/register']);
  }

  scrollToFeaturedCourses() {
    const featuredCoursesElement =
      this.el.nativeElement.querySelector('#featured-courses');
    if (featuredCoursesElement) {
      featuredCoursesElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
