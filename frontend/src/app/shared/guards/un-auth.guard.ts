import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
@Injectable(
  {
    providedIn: 'root'
  })
export class UnAuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(){
    if (this._authService.isAuthenticated()) {
      let role = this._authService.user.role;
      if (role === 'student') {
        this._router.navigate(['/student/my-absences']);
      } else if (role === 'professor') {
        this._router.navigate(['/professor/students']);
      } else if (role === 'admin') {
        this._router.navigate(['/admin/students']);
      }
      return false;
    } else {
      return true;
    }
  }


}
