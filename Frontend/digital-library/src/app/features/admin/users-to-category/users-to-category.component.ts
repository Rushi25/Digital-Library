import { Component, OnInit } from '@angular/core';
import {
  IUsersToCategoryModel,
  UserForAdminModel,
  UsersToCategoryModel,
} from '../../../api-client/api-client';
import { UsersToCategoryService } from './users-to-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-users-to-category',
  templateUrl: './users-to-category.component.html',
  styleUrl: './users-to-category.component.scss',
})
export class UsersToCategoryComponent implements OnInit {
  categories: UsersToCategoryModel[] = [];
  users: UserForAdminModel[] = [];
  selectedCategoryId = 0;
  selectedCategoryTitle = '';
  selectedUserIds = new Set<string>();

  constructor(
    private readonly usersToCategoryService: UsersToCategoryService,
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsersWithCategories();
    this.getUsers();
  }

  getUsersWithCategories() {
    this.usersToCategoryService.getUsersToCategory().subscribe({
      next: (res: UsersToCategoryModel[]) => {
        if (res) {
          this.categories = res;
          this.onCategoryChange(this.selectedCategoryId == 0 ? res[0].categoryId : this.selectedCategoryId);
        }
      },
      error: () => {
        this._snackBar.open(
          'Something went wrong while fetching information.',
          'OK',
          { duration: 3000 }
        );
      },
    });
  }

  getUsers() {
    this.usersToCategoryService.getUsers().subscribe({
      next: (res: UserForAdminModel[]) => {
        this.users = res;
      },
      error: () => {
        this._snackBar.open(
          'Something went wrong while fetching information.',
          'OK',
          { duration: 3000 }
        );
      },
    });
  }

  onCategoryChange(categoryId: number) {
    this.selectedCategoryId = categoryId;
    const category = this.categories.find(
      (cat) => cat.categoryId === categoryId
    );
    this.selectedCategoryTitle = category?.categoryTitle ?? '';
    this.selectedUserIds = new Set(
      category?.users?.flatMap((a) => a.userId ?? '') || []
    );
  }

  onUserCheckboxChange($event: MatSelectionListChange) {
    $event.options.forEach((a) => {
      if (this.selectedUserIds.has(a.value)) {
        this.selectedUserIds.delete(a.value);
      } else {
        this.selectedUserIds.add(a.value);
      }
    });
  }

  save() {
    const result: IUsersToCategoryModel = {
      categoryId: this.selectedCategoryId,
      categoryTitle: this.selectedCategoryTitle,
      users: this.users.filter((user) => {
        return this.selectedUserIds.has(user.userId ?? '');
      }),
    };

    this.usersToCategoryService
      .addUsersToCategory(new UsersToCategoryModel(result))
      .subscribe({
        next: () => {
          this._snackBar.open('Changes applied successfully.', 'Ok', { duration: 3000 });
          this.getUsersWithCategories();
        },
        error: (res: string) => {
          this._snackBar.open(res, 'Ok', { duration: 3000 });
        },
      });
  }
}
