import { Component } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {User} from "../../shared/types/user.type";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  private _alreadyExist: boolean;
  private _userType: string;

  constructor(private readonly _apiService: ApiService, private readonly _router: Router) {
    this._alreadyExist = false;
    this._userType = 'student';
  }

  get alreadyExist(): boolean {
    return this._alreadyExist;
  }

  get userType(): string {
    return this._userType;
  }

  set userType(userType: string) {
    this._userType = userType;
  }

  submit(form: User) {
    form.password = 'password';
    this._apiService.create(form, this._userType).subscribe((response: any) => {
      this._router.navigate([`/admin/${this._userType}s`]);
    }, (error) => {
      this._alreadyExist = true;
    });

  }

}
