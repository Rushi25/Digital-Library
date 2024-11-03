import { Injectable } from '@angular/core';
import { ApiClient, Category } from '../../api-client/api-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.apiClient.home();
  } 
}
