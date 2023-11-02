import { Component } from '@angular/core';
import {User} from "../../shared/types/user.type";
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent {

  private _alreadyExist: boolean;

  constructor(private readonly _apiService: ApiService, private readonly _router: Router) {
    this._alreadyExist = false;
  }

  get alreadyExist(): boolean {
    return this._alreadyExist;
  }

  submit(form: User) {
    form.password = 'password';
    this._apiService.create(form, 'student').subscribe((response: any) => {
      this._router.navigate(['/students']);
    }, (error) => {
      this._alreadyExist = true;
    });

  }

}
