import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryItemService } from '../services/category-item.service';

@Component({
  selector: 'app-category-item-delete',
  templateUrl: './category-item-delete.component.html',
})
export class CategoryItemDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoryItemDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
    private categoryItemService: CategoryItemService,
    private _snackBar: MatSnackBar
  ) {}

  onDeleteClick(): void {
    this.categoryItemService.deleteCategory(this.data.id).subscribe({
      next: () => {
        this._snackBar.open('Category item deleted successfully.', 'OK');
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Category item with given id not found.', 'OK');
        } else {
          this._snackBar.open('Something went wrong.', 'OK');
        }
      },
    });
  }
}
