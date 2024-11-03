import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ApiClient, Content } from '../../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private readonly apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getContent(categoryItemId: number): Observable<Content> {
    return this.apiClient.contentGET(categoryItemId);
  }
}
