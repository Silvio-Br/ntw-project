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
      this._router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }


}
