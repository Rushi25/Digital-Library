import { Component, OnInit } from '@angular/core';
import { MediaType } from '../../../../api-client/api-client';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaTypeService } from '../services/media-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-media-type-detail',
  templateUrl: './media-type-detail.component.html',
})
export class MediaTypeDetailComponent implements OnInit {
  mediaType: MediaType | null = null;

  constructor(
    private route: ActivatedRoute,
    private mediaTypeService: MediaTypeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('mediaTypeId');
    if (idParam) {
      const mediaTypeId = parseInt(idParam, 10);
      this.mediaTypeService.getMediaTypeById(mediaTypeId).subscribe({
        next: (mediaType: MediaType) => {
          this.mediaType = mediaType;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._snackBar.open('Media type with given id not found.', 'OK');
          } else {
            this._snackBar.open('Something went wrong.', 'OK');
          }
          this.goBack();
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['admin/media-type']);
  }
}
