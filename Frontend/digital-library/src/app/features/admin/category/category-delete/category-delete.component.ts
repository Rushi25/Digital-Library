import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
})
export class CategoryDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
    private readonly categoryService: CategoryService,
    private readonly _snackBar: MatSnackBar,
    private readonly loaderService: LoaderService
  ) {}

  onDeleteClick(): void {
    this.loaderService.show();
    this.categoryService.deleteCategory(this.data.id).subscribe({
      next: () => {
        this._snackBar.open('Category deleted successfully.', 'OK');
        this.dialogRef.close(true);
        this.loaderService.hide();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Category with given id not found.', 'OK');
        } else {
          this._snackBar.open('Something went wrong.', 'OK');
        }
        this.loaderService.hide();
      },
    });
  }
}
