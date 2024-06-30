import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaTypeService } from '../services/media-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-media-type-delete',
  templateUrl: './media-type-delete.component.html'
})
export class MediaTypeDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<MediaTypeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
    private mediaTypeService: MediaTypeService,
    private _snackBar: MatSnackBar
  ) {}

  onDeleteClick(): void {
    this.mediaTypeService.deleteMediaType(this.data.id).subscribe({
      next: () => {
        this._snackBar.open('Media type deleted successfully.', 'OK');
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Media type with given id not found.', 'OK');
        } else {
          this._snackBar.open('Something went wrong.', 'OK');
        }
      },
    });
  }
}
