import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../api-client/api-client';
import { CategoryService } from '../../../../core/services/category.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../../modules/material.module';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent {
  category: Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const categoryId = parseInt(idParam, 10);
      this.categoryService.getCategoryById(categoryId).subscribe({
        next: (category: Category) => {
        this.category = category;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Category with given id not found.', 'OK');
        } else {
          this._snackBar.open('Something went wrong.', 'OK');
        }
        this.router.navigate(['/admin/categories']);
      }
    });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/categories']);
  }
}
