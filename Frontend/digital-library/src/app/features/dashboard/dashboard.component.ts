import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../shared/services/loader.service';
import { GroupedCategoryItemsByCategoryModel } from '../../api-client/api-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  categoryDetails: GroupedCategoryItemsByCategoryModel[] = [];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly _snackBar: MatSnackBar,
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.getCategoryDetailsModel();
  }

  getCategoryDetailsModel() {
    this.dashboardService.getCategoryDetailsModel().subscribe({
      next: (rsp: GroupedCategoryItemsByCategoryModel[]) => {
        this.categoryDetails = rsp;
        this.loaderService.hide();
      },
      error: (error: string) => {
        this._snackBar.open(error, 'OK', { duration: 3000 });
        this.loaderService.hide();
      }
    });
  }

  showContent(categoryItemId: number) {
    this.router.navigate(['/dashboard/content/' + categoryItemId]);
  }
}
