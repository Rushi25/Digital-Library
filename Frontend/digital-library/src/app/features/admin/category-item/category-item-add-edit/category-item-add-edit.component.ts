import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryItemService } from '../services/category-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Category,
  CategoryItem,
  MediaType,
} from '../../../../api-client/api-client';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaTypeService } from '../../media-type/services/media-type.service';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-category-item-add-edit',
  templateUrl: './category-item-add-edit.component.html'
})
export class CategoryItemAddEditComponent implements OnInit {
  categoryItemForm!: FormGroup;
  categoryItemId!: number;
  categoryId!: number;
  isEditMode = false;
  mediaTypes!: MediaType[];
  category: Category | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryItemService: CategoryItemService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private mediaTypeService: MediaTypeService
  ) {
    this.initCategoryItemForm();
  }

  initCategoryItemForm() {
    this.categoryItemForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      description: [''],
      mediaTypeId: ['', [Validators.required]],
      dateReleased: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('itemId');
    const categoryIdParam = this.route.snapshot.paramMap.get('categoryId');
    if (categoryIdParam) {
      this.categoryId = parseInt(categoryIdParam, 10);
      this.getCategory();
    } else {
      this._snackBar.open('No category id given.', 'OK');
      this.goToCategories();
    }
    if (idParam) {
      this.patchToCategoryItemForm(idParam);
    }
    this.getMediaTypes();
  }

  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category: Category) => {
        this.category = category;
      },
      error: () => {
        this._snackBar.open('Something went wrong', 'OK');
        this.goToCategories();
      },
    });
  }

  patchToCategoryItemForm(idParam: string) {
    this.categoryItemId = parseInt(idParam, 10);
    this.isEditMode = true;
    this.categoryItemService
      .getCategoryItemById(this.categoryItemId)
      .subscribe({
        next: (categoryItem: CategoryItem) => {
          this.categoryItemForm.patchValue(categoryItem);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._snackBar.open('Category item with given id not found.', 'OK');
          } else {
            this._snackBar.open('Something went wrong.', 'OK');
          }
          this.goBack();
        },
      });
  }

  getMediaTypes() {
    this.mediaTypeService.getMediaTypes().subscribe({
      next: (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      },
      error: () => {
        this._snackBar.open(
          'Something went wrong while fecting media types.',
          'OK'
        );
        this.goBack();
      },
    });
  }

  onSubmit(): void {
    if (this.categoryItemForm.valid && this.categoryId !== null) {
      const categoryItem: CategoryItem = this.categoryItemForm.value;

      if (this.isEditMode && this.categoryItemId !== null) {
        categoryItem.id = this.categoryItemId;
        categoryItem.categoryId = this.categoryId;

        this.categoryItemService
          .updateCategoryItem(this.categoryItemId, categoryItem)
          .subscribe({
            next: () => {
              this._snackBar.open('Category item edited succesfully.', 'OK');
              this.goBack();
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this._snackBar.open('Category item with given id not found.', 'OK');
              } else if (error.status === 400) {
                this._snackBar.open(
                  'Please add correct category item details',
                  'OK'
                );
              } else {
                this._snackBar.open('Something went wrong.', 'OK');
              }
            },
          });
      } else {
        categoryItem.categoryId = this.categoryId;
        this.categoryItemService.createCategoryItem(categoryItem).subscribe({
          next: () => {
            this._snackBar.open('Category item added succesfully.', 'OK');
            this.goBack();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._snackBar.open(
                'Please add correct category item details',
                'OK'
              );
            } else {
              this._snackBar.open('Something went wrong.', 'OK');
            }
          },
        });
      } 
    }
  }

  goBack(): void {
    this.router.navigate(['admin/category-item/' + this.categoryId]);
  }

  goToCategories() {
    this.router.navigate(['/admin/category']);
  }
}