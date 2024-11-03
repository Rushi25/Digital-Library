import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';
import { Content } from '../../../api-client/api-client';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  content!: Content;
  categoryItemId = 0;
  htmlContent!: SafeHtml;
  videoLink!: SafeResourceUrl;

  constructor(
    private readonly contentService: ContentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('categoryItemId');
    if (idParam) {
      this.categoryItemId = parseInt(idParam, 10);
      this.loadContent();
    } else {
      this._snackBar.open('No category item id present.', 'Ok', {duration: 3000});
      this.goBack();
    }
  }

  loadContent() {
    this.contentService.getContent(this.categoryItemId).subscribe({
      next: (rsp: Content) => {
        if (rsp) {
          this.content = rsp;
          if (rsp?.htmlContent) {
            this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rsp?.htmlContent);
          }
          if(rsp?.videoLink) {
            this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(rsp?.videoLink);
          }
        } else {
          this._snackBar.open('Content for this category item not present.', 'Ok', {duration: 3000});
          this.goBack();
        }
      },
      error: () => {
        this._snackBar.open('Something wentt wrong while fetching content', 'Ok', {duration: 3000})
      }
    });
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
