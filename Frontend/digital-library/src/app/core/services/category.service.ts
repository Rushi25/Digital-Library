import { Injectable } from '@angular/core';
import { ApiClient, Category } from '../../api-client/api-client';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiClient: ApiClient;

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
