import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ApiClient, Category } from '../../../../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.apiClient.categoryAll();
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.apiClient.categoryGET(categoryId);
  }

  updateCategory(categoryId: number, category: Category): Observable<void> {
    return this.apiClient.categoryPUT(categoryId, category);
  }

  createCategory(category: Category): Observable<Category> {
    return this.apiClient.categoryPOST(category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.apiClient.categoryDELETE(id);
  }
}
