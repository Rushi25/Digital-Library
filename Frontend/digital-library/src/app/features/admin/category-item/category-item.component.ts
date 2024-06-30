import { Component, OnInit } from '@angular/core';
import { Category, CategoryItem, MediaType } from '../../../api-client/api-client';
import { CategoryItemService } from './services/category-item.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryItemDeleteComponent } from './category-item-delete/category-item-delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaTypeService } from '../media-type/services/media-type.service';
import { CategoryService } from '../category/services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
})
export class CategoryItemComponent implements OnInit {
  categoryItems: CategoryItem[] = [];
  categoryId!: number;
  columns: string[] = [
    'title',
    'description',
    'mediaType',
    'dateReleased',
    'action',
  ];
  mediaTypes!: MediaType[];
  category: Category | undefined;
  
  constructor(
    private categoryItemService: CategoryItemService,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private mediaTypeService: MediaTypeService
  ) {}

  ngOnInit(): void {
    this.getMediaTypes();
    const idParam = this.route.snapshot.paramMap.get('categoryId');
    if (idParam) {
      this.categoryId = parseInt(idParam, 10);
      this.getCategory();
      this.loadCategoryItems(this.categoryId);
    }
  }

  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category: Category) => {
        this.category = category;
      },
      error: () => {
        this._snackBar.open('Error while fetching category.','OK')
        this.goBack();
      }
    })
  }

  loadCategoryItems(categoryId: number) {
    this.categoryItemService.getCategoryItems(categoryId).subscribe({
      next: (res: CategoryItem[]) => {
        this.categoryItems = res;
      },
      error: (error) => {
        this._snackBar.open(error, 'OK');
        this.goBack();
      },
    });
  }

  deleteCategoryItem(id: number, title: string): void {
    const dialogRef = this.dialog.open(CategoryItemDeleteComponent, {
      data: { id, title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategoryItems(this.categoryId);
      }
    });
  }

  getMediaTypes() {
    this.mediaTypeService.getMediaTypes().subscribe({
      next: (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      },
      error: () => {
        this._snackBar.open('Something went wrong while fecting media types.', 'OK');
        this.goBack();
      }
    })
  }

  getMediaTypeTitle(mediaTypeId: number) {
    return this.mediaTypes?.find(a => a.id == mediaTypeId)?.title;
  }

  goBack() {
    this.router.navigate(['/admin/category']);
  }

  getContentAddLink(categoryItemId: number): string {
    return '/admin/content/' + this.categoryId + '/' + categoryItemId + '/add';
  }

  getContentEditLink(categoryItemId: number, contentId: number): string {
    return '/admin/content/' + this.categoryId + '/' + categoryItemId + '/edit/' + contentId;
  }
}
