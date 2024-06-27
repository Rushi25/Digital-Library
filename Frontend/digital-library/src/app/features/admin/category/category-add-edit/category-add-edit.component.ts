import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../api-client/api-client';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
})
export class CategoryAddEditComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId!: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      description: [''],
      thumbnailImagePath: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('categoryId');
    if (idParam) {
      this.categoryId = parseInt(idParam, 10);
      this.isEditMode = true;
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (category: Category) => {
          this.categoryForm.patchValue(category);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this._snackBar.open('Category with given id not found.', 'OK');
          } else {
            this._snackBar.open('Something went wrong.', 'OK');
          }
          this.goBack();
        },
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category: Category = this.categoryForm.value;
      if (this.isEditMode && this.categoryId !== null) {
        category.id = this.categoryId;
        this.categoryService
          .updateCategory(this.categoryId, category)
          .subscribe({
            next: () => {
              this._snackBar.open('Category edited succesfully.', 'OK');
              this.goBack();
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this._snackBar.open('Category with given id not found.', 'OK');
              } else if (error.status === 400) {
                this._snackBar.open(
                  'Please add correct category details',
                  'OK'
                );
              } else {
                this._snackBar.open('Something went wrong.', 'OK');
              }
              this.goBack();
            },
          });
      } else {
        this.categoryService.createCategory(category).subscribe({
          next: () => {
            this._snackBar.open('Category added succesfully.', 'OK');
            this.goBack();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._snackBar.open('Please add correct category details', 'OK');
            } else {
              this._snackBar.open('Something went wrong.', 'OK');
            }
            this.goBack();
          },
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['admin/category']);
  }
}
