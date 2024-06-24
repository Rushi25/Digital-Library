import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../api-client/api-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../modules/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatTableModule, MaterialModule, RouterOutlet, RouterLink],
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
      error: (err) => {
        this._snackBar.open(err, 'OK');
      },
    });
  }

  deleteCategory(id: number, title: string): void {
    const dialogRef = this.dialog.open(CategoryDeleteComponent, {
      data: { id, title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }
}
