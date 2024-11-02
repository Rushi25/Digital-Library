import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryItemService } from '../services/category-item.service';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-category-item-delete',
  templateUrl: './category-item-delete.component.html',
})
export class CategoryItemDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoryItemDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
    private readonly categoryItemService: CategoryItemService,
    private readonly _snackBar: MatSnackBar,
    private readonly loaderService: LoaderService
  ) {}

  onDeleteClick(): void {
    this.loaderService.show();
    this.categoryItemService.deleteCategory(this.data.id).subscribe({
      next: () => {
        this._snackBar.open('Category item deleted successfully.', 'OK');
        this.dialogRef.close(true);
        this.loaderService.hide();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Category item with given id not found.', 'OK');
        } else {
          this._snackBar.open('Something went wrong.', 'OK');
        }
        this.loaderService.hide();
      },
    });
  }
}
