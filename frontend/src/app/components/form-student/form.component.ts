import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ApiService} from "../../shared/services/api.service";
import {User} from "../../shared/types/user.type";

@Component({
  selector: 'app-form-student',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  private _form: FormGroup;

  // private property to store submit$ value
  private readonly _submit$: EventEmitter<User>;
  private _model: User;
  private _isUpdateMode: boolean;

  constructor(private readonly _authService: AuthService, private readonly _apiService: ApiService) {
    this._model = {} as User;
    this._form = this._buildForm();
    this._submit$ = new EventEmitter<User>();
    this._isUpdateMode = false;
  }

  @Input()
  set model(model: User) {
    this._model = model;
  }

  get form(): FormGroup {
    return this._form;
  }

  @Output('submit')
  get submit$(): EventEmitter<User> {
    return this._submit$;
  }

  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
      };
      this._isUpdateMode = false;
    }

    // update form's values with model
    this._form.patchValue(this._model);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl(
        this._model.firstname,
        Validators.compose([Validators.required])
      ),
      lastname: new FormControl(
        this._model.lastname,
        Validators.compose([Validators.required])
      ),
      email: new FormControl(this._model.email, [Validators.required, Validators.email]),
      phone: new FormControl(this._model.phone, Validators.compose([
        Validators.required,
        Validators.pattern('(0|\\+33)\\d{9}'),
      ])),
    });
  }

  submit(person: User): void {
    this._submit$.emit(person);
  }
}
