import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryItem, Content } from '../../../api-client/api-client';
import { CategoryItemService } from '../category-item/services/category-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentService } from './content.service';
import { CategoryService } from '../category/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-content-add-edit',
  templateUrl: './content-add-edit.component.html'
})
export class ContentAddEditComponent implements OnInit {
  contentForm!: FormGroup;
  contentId!: number;
  categoryItemId!: number;
  categoryId!: number;
  isEditMode = false;
  categoryItem: CategoryItem | undefined;
  category!: Category;

  constructor(
    private fb: FormBuilder,
    private categoryItemService: CategoryItemService,
    private contentService: ContentService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.initCategoryItemForm();
  }

  initCategoryItemForm() {
    this.contentForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      htmlContent: [''],
      videoLink: [''],
    });
  }

  ngOnInit(): void {
    this.getQueryParam();
    this.getCategory();
    this.getCategoryItem();
    if (this.isEditMode) {
      this.pathContentForm();
    }
  }

  getQueryParam() {
    const categoryIdParam = this.route.snapshot.paramMap.get('categoryId');
    const categoryItemIdParam = this.route.snapshot.paramMap.get('categoryItemId');
    const contentIdParam = this.route.snapshot.paramMap.get('contentId');

    if (categoryIdParam && categoryItemIdParam) {
      this.categoryId = parseInt(categoryIdParam, 10);
      this.categoryItemId = parseInt(categoryItemIdParam, 10);
    } else {
      this._snackBar.open('Please provide category id or category item id.', 'OK');
      this.router.navigate(['/admin/categories']);
    }
    if (contentIdParam) {
      this.contentId = parseInt(contentIdParam, 10);
      this.isEditMode = true;
    }
  }

  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category: Category) => {
        this.category = category;
      },
      error: () => {
        this._snackBar.open('Invalid category', 'OK');
        this.goToCategory();
      }
    })
  }

  getCategoryItem() {
    this.categoryItemService.getCategoryItemById(this.categoryItemId).subscribe({
      next: (categoryItem: CategoryItem) => {
        this.categoryItem = categoryItem;
      },
      error: () => {
        this._snackBar.open('Invalid category item', 'OK');
        this.goToCategoryItem();
      }
    })
  }

  pathContentForm() {
    this.contentService.getContentById(this.contentId).subscribe({
      next: (content: Content) => {
        this.contentForm.patchValue(content);
      },
      error: () => {
        this._snackBar.open('Invalid content id', 'OK');
        this.goToCategoryItem()
      }
    })
  }

  onSubmit() {
    if (this.contentForm.valid && this.categoryItemId !== null && this.categoryId !== null) {
      const content: Content = this.contentForm.value;

      if (this.isEditMode && this.contentId !== null) {
        content.id = this.contentId;
        content.categoryId = this.categoryId;
        content.catItemId = this.categoryItemId;

        this.contentService
          .updateContent(this.contentId, content)
          .subscribe({
            next: () => {
              this._snackBar.open('Content edited succesfully.', 'OK');
              this.goToCategoryItem();
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this._snackBar.open('Content with given id not found.', 'OK');
              } else if (error.status === 400) {
                this._snackBar.open(
                  'Please add correct content details',
                  'OK'
                );
              } else {
                this._snackBar.open('Something went wrong.', 'OK');
              }
            },
          });
      } else {
        content.categoryId = this.categoryId;
        content.catItemId = this.categoryItemId;
        this.contentService.createContent(content).subscribe({
          next: () => {
            this._snackBar.open('Content added succesfully.', 'OK');
            this.goToCategoryItem();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._snackBar.open(
                'Please add correct Content details',
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

  goToCategory() {
    this.router.navigate(['/admin/category']);
  }

  goToCategoryItem() {
    this.router.navigate(['/admin/category-item/' + this.categoryId]);
  }
}