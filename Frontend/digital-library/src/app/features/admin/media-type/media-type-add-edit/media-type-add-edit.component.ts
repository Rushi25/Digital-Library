import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaTypeService } from '../services/media-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaType } from '../../../../api-client/api-client';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-media-type-add-edit',
  templateUrl: './media-type-add-edit.component.html',
})
export class MediaTypeAddEditComponent implements OnInit {
  mediaTypeForm!: FormGroup;
  mediaTypeId!: number;
  isEditMode = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mediaTypeService: MediaTypeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly loaderService: LoaderService
  ) {
    this.mediaTypeForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      thumbnailImagePath: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loaderService.show();
    const idParam = this.route.snapshot.paramMap.get('mediaTypeId');
    if (idParam) {
      this.mediaTypeId = parseInt(idParam, 10);
      this.isEditMode = true;
      this.mediaTypeService.getMediaTypeById(this.mediaTypeId).subscribe({
        next: (mediaType: MediaType) => {
          this.mediaTypeForm.patchValue(mediaType);
          this.loaderService.hide();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this._snackBar.open('Media type with given id not found.', 'OK');
          } else {
            this._snackBar.open('Something went wrong.', 'OK');
          }
          this.goBack();
        },
      });
    }
  }

  onSubmit(): void {
    if (this.mediaTypeForm.valid) {
      const mediaType: MediaType = this.mediaTypeForm.value;
      if (this.isEditMode && this.mediaTypeId !== null) {
        mediaType.id = this.mediaTypeId;
        this.mediaTypeService
          .updateMediaType(this.mediaTypeId, mediaType)
          .subscribe({
            next: () => {
              this._snackBar.open('Media type edited succesfully.', 'OK');
              this.goBack();
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this._snackBar.open('Media type with given id not found.', 'OK');
              } else if (error.status === 400) {
                this._snackBar.open(
                  'Please add correct media type details',
                  'OK'
                );
              } else {
                this._snackBar.open('Something went wrong.', 'OK');
              }
              this.loaderService.hide();
            },
          });
      } else {
        this.mediaTypeService.createMediaType(mediaType).subscribe({
          next: () => {
            this._snackBar.open('Media type added succesfully.', 'OK');
            this.goBack();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._snackBar.open('Please add correct media type details', 'OK');
            } else {
              this._snackBar.open('Something went wrong.', 'OK');
            }
            this.loaderService.hide();
          },
        });
      }
    }
  }

  goBack(): void {
    this.loaderService.hide();
    this.router.navigate(['admin/media-type']);
  }
}
