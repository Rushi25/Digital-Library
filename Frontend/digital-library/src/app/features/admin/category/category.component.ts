import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../api-client/api-client';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from './services/category.service';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  columns: string[] = ['title', 'description', 'thumbnailImagePath', 'action'];
  constructor(
    private readonly categoryService: CategoryService,
    private readonly _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: (error) => {
        this._snackBar.open(error, 'OK');
      },
    });
  }

  deleteCategory(id: number, title: string): void {
    const dialogRef = this.dialog.open(CategoryDeleteComponent, {
      data: { id, title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategories();
      }
    });
  }
}
