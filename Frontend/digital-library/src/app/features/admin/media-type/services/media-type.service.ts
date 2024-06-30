import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ApiClient, MediaType } from '../../../../api-client/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaTypeService {
  private apiClient: ApiClient;

  constructor(private readonly httpCLient: HttpClient) {
    this.apiClient = new ApiClient(httpCLient, environment.baseUrl);
  }

  getMediaTypes(): Observable<MediaType[]> {
    return this.apiClient.mediaTypesAll();
  }

  deleteMediaType(mediaTypeId: number): Observable<void> {
    return this.apiClient.mediaTypesDELETE(mediaTypeId);
  }

  getMediaTypeById(mediaTypeId: number): Observable<MediaType> {
    return this.apiClient.mediaTypesGET(mediaTypeId);
  }

  updateMediaType(mediaTypeId: number, mediaType: MediaType): Observable<void> {
    return this.apiClient.mediaTypesPUT(mediaTypeId, mediaType);
  }

  createMediaType(mediaType: MediaType): Observable<MediaType> {
    return this.apiClient.mediaTypesPOST(mediaType);
  }
}
