import { Component, OnInit } from '@angular/core';
import { MediaType } from '../../../api-client/api-client';
import { MediaTypeService } from './services/media-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MediaTypeDeleteComponent } from './media-type-delete/media-type-delete.component';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-media-type',
  templateUrl: './media-type.component.html',
  styleUrl: './media-type.component.scss',
})
export class MediaTypeComponent implements OnInit {
  mediaTypes: MediaType[] = [];
  columns: string[] = ['title', 'thumbnailImagePath', 'action'];
  constructor(
    private readonly mediaTypeService: MediaTypeService,
    private readonly _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.loadMediaTypes();
  }

  loadMediaTypes() {
    this.mediaTypeService.getMediaTypes().subscribe({
      next: (res: MediaType[]) => {
        this.mediaTypes = res;
        this.loaderService.hide();
      },
      error: (error) => {
        this._snackBar.open(error, 'OK');
        this.loaderService.hide();
      },
    });
  }

  deleteMediaType(id: number, title: string): void {
    const dialogRef = this.dialog.open(MediaTypeDeleteComponent, {
      data: { id, title },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.loadMediaTypes();
        }
      },
    });
  }
}
