import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiClient, GroupedCategoryItemsByCategoryModel } from '../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getCategoryDetailsModel(): Observable<GroupedCategoryItemsByCategoryModel[]> {
    return this.apiClient.dashboard();
  }
}
