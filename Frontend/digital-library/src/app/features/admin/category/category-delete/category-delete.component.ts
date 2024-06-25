import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.scss',
})
export class CategoryDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  onDeleteClick(): void {
    this.categoryService.deleteCategory(this.data.id).subscribe({
      next: () => {
        this._snackBar.open('Category deleted successfully.', 'OK');
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Category with given id not found.', 'OK');
        } else {
          this._snackBar.open('Something went wrong.', 'OK');
        }
      },
    });
  }
}
