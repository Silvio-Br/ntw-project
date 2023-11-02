import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../types/user.type";

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {

  private _users: User[] = [];
  private _role: string = '';

  private readonly _delete$: EventEmitter<String>;

  constructor() {
    this._delete$ = new EventEmitter<String>();
  }

  get delete$(): EventEmitter<String> {
    return this._delete$;
  }

  @Input()
  set users(users: User[]) {
    this._users = users;
  }

  @Output()
  get delete(): EventEmitter<String> {
    return this._delete$;
  }

  get role(): string {
    return this._role;
  }

  @Input()
  set role(role: string) {
    if (role === 'student') {
      this._role = 'étudiants';
    } else {
      this._role = 'professeurs';
    }
  }

  get users(): User[] {
    return this._users;
  }

  submit(_id: string | undefined) {
    this._delete$.emit(_id);
  }
}
