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
  private _nbPages: number = 1;
  private _pagesArray: number[] = [];
  private _currentPage: number = 1;
  private _currentUsers: User[] = [];
  searchName: string = '';

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
    this._currentUsers = this._users.slice(0, 10);
    this._nbPages = Math.ceil(this._users.length / 10);
    this._pagesArray = Array(this._nbPages).fill(0).map((x, i) => i + 1);
  }

  filterUsers() {
    if (this.searchName.trim() === '') {
      this._currentUsers = this._users.slice(0, 10);
      this._currentPage = 1;
    } else {
      // Filter absences based on the searchDate
      if (this._users != undefined)
        this._currentUsers = this._users.filter((user) => {
          const name = user.firstname + " " + user.lastname;
          return name.toLowerCase().includes(this.searchName.toLowerCase());
        });
    }
  }

  get nbPages(): number {
    return this._nbPages;
  }

  @Output()
  get delete(): EventEmitter<String> {
    return this._delete$;
  }

  get role(): string {
    return this._role;
  }

  get pages(): number[] {
    return this._pagesArray;
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
    return this._currentUsers;
  }

  changePage(page: number) {
    this._currentPage = page;
    this._currentUsers = this._users.slice((page - 1) * 10, page * 10);
  }

  submit(_id: string | undefined) {
    this._delete$.emit(_id);
    this._currentUsers = this._users.slice(0, 10);
  }
}
