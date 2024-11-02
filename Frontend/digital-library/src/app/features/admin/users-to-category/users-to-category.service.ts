import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ApiClient, UserForAdminModel, UsersToCategoryModel } from '../../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersToCategoryService {

  private apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getUsersToCategory(): Observable<UsersToCategoryModel[]> {
    return this.apiClient.usersToCategoryAll();
  }

  getUsers(): Observable<UserForAdminModel[]> {
    return this.apiClient.user();
  }

  addUsersToCategory(usersToCategory: UsersToCategoryModel): Observable<void | string> {
    return this.apiClient.usersToCategory(usersToCategory);
  }
}
