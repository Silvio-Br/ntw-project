import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
@Injectable(
  {
    providedIn: 'root'
  })
export class AdminGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(){
    if (this._authService.isAdmin()) {
      return true;
    } else {
      this._router.navigate(['/forbidden']);
      return false;
    }
  }


}
