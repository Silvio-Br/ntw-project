import {Component, OnInit} from '@angular/core';
import {Absence} from "../../shared/types/absence.type";
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  private _absences: Absence[] = [];

  constructor(private readonly _apiService: ApiService, private readonly _authService: AuthService) { }

  get absences(): Absence[] {
    return this._absences;
  }

  ngOnInit(): void {
    let ab = this._apiService.getAbsences(this._authService.user._id);
    ab.subscribe((absences: any) => {
      this._absences = absences;
    });
  }

}
