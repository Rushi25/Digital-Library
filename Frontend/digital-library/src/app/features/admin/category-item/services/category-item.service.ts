import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ApiClient, CategoryItem } from '../../../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryItemService {
  private apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getCategoryItems(categoryId: number): Observable<CategoryItem[]>{
    return this.apiClient.items(categoryId);
  }

  createCategoryItem(categoryItem: CategoryItem): Observable<CategoryItem> {
    return this.apiClient.categoryItemPOST(categoryItem)
  }

  getCategoryItemById(categoryItemId: number): Observable<CategoryItem> {
    return this.apiClient.categoryItemGET(categoryItemId);
  }

  updateCategoryItem(categoryItemId: number, categoryItem: CategoryItem): Observable<void> {
    return this.apiClient.categoryItemPUT(categoryItemId, categoryItem);
  }

  deleteCategory(categoryItemId: number): Observable<void> {
    return this.apiClient.categoryItemDELETE(categoryItemId);
  }
}
