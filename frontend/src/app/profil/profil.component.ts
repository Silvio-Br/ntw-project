import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  private _form: FormGroup;

  constructor(private readonly _authService: AuthService, private readonly _apiService: ApiService) {
    this._form = this._buildForm();
  }

  get form(): FormGroup {
    return this._form;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl(
        this._authService.user.firstname,
        Validators.compose([Validators.required])
      ),
      lastname: new FormControl(
        this._authService.user.lastname,
        Validators.compose([Validators.required])
      ),
      email: new FormControl(this._authService.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this._authService.user.phone, Validators.compose([
        Validators.required,
        Validators.pattern('(0|\\+33)\\d{9}'),
      ])),
    });
  }

  submit(form: any): void {
    let role = this._authService.user.role;
    this._apiService.update(this._authService.user._id, form, role).subscribe((response: any) => {
      form = response.user;
      this._authService.updateToken(response.jwt);
    });
  }
}
