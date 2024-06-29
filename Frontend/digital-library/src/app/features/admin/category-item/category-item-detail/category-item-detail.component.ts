import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryItem, MediaType } from '../../../../api-client/api-client';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryItemService } from '../services/category-item.service';
import { MediaTypeService } from '../../media-type/services/media-type.service';

@Component({
  selector: 'app-category-item-detail',
  templateUrl: './category-item-detail.component.html'
})
export class CategoryItemDetailComponent implements OnInit {
  categoryItem: CategoryItem | null = null;
  mediaTypes!: MediaType[];
  categoryId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryItemService: CategoryItemService,
    private mediaTypeService: MediaTypeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMediaTypes();
    const categoryIdParam = this.route.snapshot.paramMap.get('categoryId');
    if(categoryIdParam) {
      this.categoryId = parseInt(categoryIdParam, 10);
    }
    const idParam = this.route.snapshot.paramMap.get('itemId');
    if (idParam) {
      const categoryItemId = parseInt(idParam, 10);
      this.categoryItemService.getCategoryItemById(categoryItemId).subscribe({
        next: (category: CategoryItem) => {
          this.categoryItem = category;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._snackBar.open('Category with given id not found.', 'OK');
          } else {
            this._snackBar.open('Something went wrong.', 'OK');
          }
          this.goBack();
        },
      });
    }
  }

  getMediaTypes() {
    this.mediaTypeService.getMediaTypes().subscribe({
      next: (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      },
    })
  }

  goBack(): void {
    this.router.navigate(['/admin/category-item/' + this.categoryId]);
  }

  getMediaTypeTitle(mediaTypeId: number): string | undefined {
    return this.mediaTypes?.find(a => a.id === mediaTypeId)?.title;
  }
}