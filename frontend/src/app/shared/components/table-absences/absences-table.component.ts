import {Component, Input, OnInit} from '@angular/core';
import {Absence} from "../../types/absence.type";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-student-table',
  templateUrl: './absences-table.component.html',
  styleUrls: ['./absences-table.component.css']
})
export class StudentTableComponent {

  private _absences: any[] = [];
  private _nbPages: number = 1;
  private _pagesArray: number[] = [];
  private _currentPage: number = 1;
  private _currentAbsences: any[] = [];

  constructor() {
  }

  get nbPages(): number {
    return this._nbPages;
  }

  @Input()
  set absences(absences: any[]) {
    this._absences = absences;
    this._currentAbsences = this._absences.slice(0, 10);
    this._nbPages = Math.ceil(this._absences.length / 10);
    this._pagesArray = Array(this._nbPages).fill(0).map((x, i) => i + 1);
  }

  get pages(): number[] {
    return this._pagesArray;
  }

  get absences(): any[] {
    return this._currentAbsences;
  }

  changePage(page: number) {
    this._currentPage = page;
    this._currentAbsences = this._absences.slice((page - 1) * 10, page * 10);
  }

}
