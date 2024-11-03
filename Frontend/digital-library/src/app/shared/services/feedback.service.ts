import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiClient, Feedback } from '../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  postFeedback(feedback: Feedback): Observable<Feedback> {
    return this.apiClient.feedbacksPOST(feedback);
  }
}
