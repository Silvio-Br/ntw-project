import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const TOKEN_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();


  get token(): any {
    return localStorage.getItem(TOKEN_NAME);
  }

  constructor(private apiService: ApiService, private jwtHelper: JwtHelperService) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(TOKEN_NAME, response.access_token);
      })
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem(TOKEN_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
