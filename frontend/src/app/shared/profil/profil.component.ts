import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {User} from "../types/user.type";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  private _currentUser: User;

  constructor(private readonly _authService: AuthService, private readonly _apiService: ApiService) {
    this._currentUser = this._authService.user;
  }

  get currentUser(): User {
    return this._currentUser;
  }


  submit(form: User): void {
    let role = this._authService.user.role;
    this._apiService.update(this._authService.user._id, form, role).subscribe((response: any) => {
      form = response.user;
      this._authService.updateToken(response.jwt);
    });
  }
}
