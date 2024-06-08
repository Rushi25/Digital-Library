import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient, LoginModel, RegisterModel, TokenModel } from '../../api-client/api-client';
import { AccessTokenKey, BaseUrl, RefreshTokenKey } from '../../app.constant';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiClient: ApiClient;

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.apiClient = new ApiClient(http, BaseUrl);
  }

  register(model: RegisterModel): Observable<string> {
    return this.apiClient.register(model);
  }

  logIn(model: LoginModel): Observable<TokenModel> {
    return this.apiClient.login(model);
  }

  refresh(model: TokenModel): Observable<TokenModel> {
    return this.apiClient.refresh(model);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem(AccessTokenKey, tokenValue)
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem(RefreshTokenKey, tokenValue)
  }

  getToken(){
    return localStorage.getItem(AccessTokenKey)
  }

  getRefreshToken(){
    return localStorage.getItem(RefreshTokenKey)
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem(AccessTokenKey)
  }

  decodedToken(): any{
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const decoded = jwtHelper.decodeToken(token);
    console.log(decoded);
    if(decoded != null) {
      return decoded;
    }
  }

  renewToken(model : TokenModel): Observable<TokenModel>{
    return this.apiClient.refresh(model);
  }
}
