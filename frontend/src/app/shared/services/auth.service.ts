import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from "../types/user.type";

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
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  isProfessor() {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken.role === 'professor';
  }

  isStudent() {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken.role === 'student';
  }

  get user(): any {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken;
  }

  get firstName(): string {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken.firstname;
  }

  get lastName(): string {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken.lastname;
  }
  get email(): string {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken.email;
  }
    get id():String {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken._id;

}
  updateToken(jwt: any) {
    localStorage.setItem(TOKEN_NAME, jwt);
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this._isLoggedIn$.next(false);
  }

  isAdmin() {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken.role === 'admin';
  }
}
