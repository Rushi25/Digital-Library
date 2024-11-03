import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaTypeService } from '../services/media-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-media-type-delete',
  templateUrl: './media-type-delete.component.html'
})
export class MediaTypeDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<MediaTypeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
    private readonly mediaTypeService: MediaTypeService,
    private readonly _snackBar: MatSnackBar,
    private readonly loaderService: LoaderService
  ) {}

  onDeleteClick(): void {
    this.loaderService.show();
    this.mediaTypeService.deleteMediaType(this.data.id).subscribe({
      next: () => {
        this._snackBar.open('Media type deleted successfully.', 'OK', {duration:3000});
        this.dialogRef.close(true);
        this.loaderService.hide();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open('Media type with given id not found.', 'OK', {duration:3000});
        } else {
          this._snackBar.open('Something went wrong.', 'OK', {duration:3000});
        }
        this.loaderService.hide();
      },
    });
  }
}
