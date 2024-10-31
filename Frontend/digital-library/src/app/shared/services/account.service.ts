import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, map, BehaviorSubject} from 'rxjs';
import {
  ApiClient,
  UserModel,
  RegisterModel,
  LoginModel,
} from '../../api-client/api-client';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { role } from '../role.enum';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiClient: ApiClient;
  private readonly userSource = new ReplaySubject<UserModel | null>(1);
  user$ = this.userSource.asObservable();

  private readonly isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    http: HttpClient,
    private readonly router: Router,
    private readonly jwtService: JwtHelperService
  ) {
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
    this.isAdminUser();
  }

  isAdminUser() {
    const jwt = this.getJwt()
    if (jwt !== undefined) {
      const decodeToken = this.jwtService.decodeToken(jwt);
      if(decodeToken){
        this.isAdminSubject.next(decodeToken.role === role.Admin);
      }
      else {
        this.isAdminSubject.next(false);
      }
    }
    else {
      this.isAdminSubject.next(false);
    }
  }

  getJwt(): string | undefined {
    const userJson = localStorage.getItem(environment.userKey);
    if (userJson) {
      const user: UserModel = JSON.parse(userJson);
      return user.jwt;
    } else {
      return undefined;
    }
  }

  refreshUser(jwt: string | undefined) {
    if (jwt === undefined) {
      this.userSource.next(null);
      return of(undefined);
    }
    return this.apiClient.refresh().pipe(
      map((user: UserModel) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    this.user$.subscribe({
      next: (res) => {
        if (res !== null) {
          return true;
        }
        return false;
      },
    });
    return false;
  }

  logout() {
    localStorage.clear();
    this.userSource.next(null);
    this.isAdminSubject.next(false);
    this.router.navigate(['/login']);
  }
}
