import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient, LoginModel, RegisterModel, UserModel } from '../../api-client/api-client';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiClient: ApiClient;
  private userSource = new ReplaySubject<UserModel | null>(1);
  user$ = this.userSource.asObservable();

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.apiClient = new ApiClient(http, environment.baseUrl);
  }

  register(model: RegisterModel): Observable<string> {
    return this.apiClient.register(model);
  }

  logIn(model: LoginModel): Observable<UserModel> {
    return this.apiClient.login(model);
  }

  setUser(user: UserModel) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }

  getJwt(): string | undefined {
    const userJson = localStorage.getItem(environment.userKey);
    if(userJson){
      const user: UserModel = JSON.parse(userJson);
      return user.jwt;
    }
    else {
      return undefined;
    }
  }

  refreshUser(jwt: string | undefined) {
    if (jwt === undefined){
      this.userSource.next(null);
      return of(undefined);
    }
    return this.apiClient.refresh().pipe(
      map((user: UserModel) => {
        if(user) {
          this.setUser(user);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    this.user$.subscribe({
      next: (res) => {
        if(res !== null) {
          return true;
        }
        return false;
      }
    })
    return false;
  }

  logout(){
    localStorage.clear();
    this.userSource.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAdminUser(): boolean {
    return true;
  }
}
