import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly _authService: AuthService, private readonly _router: Router) {
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  get isLoginPage(): boolean {
    return window.location.pathname === '/login';
  }

  get isStudent(): boolean {
    // check user role is student
    return this._authService.isStudent();
  }

  get isAdmin(): boolean {
    // check user role is admin
    return this._authService.isAdmin();
  }

  get isProfessor(): boolean {
    // check user role is professor
    return this._authService.isProfessor();
  }

  get firstName(): string {
    // get user first name
    return this._authService.firstName;
  }

  get lastName(): string {
    // get user last name
    return this._authService.lastName;
  }
}
