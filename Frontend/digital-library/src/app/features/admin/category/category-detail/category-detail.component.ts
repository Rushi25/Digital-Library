import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../api-client/api-client';
import { CategoryService } from '../services/category.service';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
})
export class CategoryDetailComponent implements OnInit {
  category: Category | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('categoryId');
    if (idParam) {
      this.loaderService.show();
      const categoryId = parseInt(idParam, 10);
      this.categoryService.getCategoryById(categoryId).subscribe({
        next: (category: Category) => {
          this.category = category;
          this.loaderService.hide();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._snackBar.open('Category with given id not found.', 'OK', {duration:3000});
          } else {
            this._snackBar.open('Something went wrong.', 'OK', {duration:3000});
          }
          this.goBack();
        },
      });
    }
  }

  goBack(): void {
    this.loaderService.hide();
    this.router.navigate(['admin/category']);
  }
}
