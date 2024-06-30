import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient, Content } from '../../../api-client/api-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getContentById(contentId: number): Observable<Content> {
    return this.apiClient.contentGET(contentId);
  }

  updateContent(contentId: number, content: Content): Observable<void> {
    return this.apiClient.contentPUT(contentId, content);
  }

  createContent(content: Content): Observable<Content> {
    return this.apiClient.contentPOST(content);
  }
}
