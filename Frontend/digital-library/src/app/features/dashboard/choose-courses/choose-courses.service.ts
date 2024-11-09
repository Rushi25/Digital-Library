import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ApiClient, UserSelectedCategory } from '../../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChooseCoursesService {

  private readonly apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getUserCoursesToChoose(): Observable<UserSelectedCategory[]> {
    return this.apiClient.chooseCategoryAll();
  }

  saveUserCourses(userCourses: UserSelectedCategory[]): Observable<void> {
    return this.apiClient.chooseCategory(userCourses);
  }
}
