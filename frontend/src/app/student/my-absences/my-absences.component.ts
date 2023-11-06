import {Component, OnInit} from '@angular/core';
import {AbsencesService} from "../../shared/services/absences.service";
import {AuthService} from "../../shared/services/auth.service";
import {Absence} from "../../shared/types/absence.type";

@Component({
  selector: 'app-my-absences',
  templateUrl: './my-absences.component.html',
  styleUrls: ['./my-absences.component.css']
})
export class MyAbsencesComponent implements OnInit {

    private _absences: Absence[] = [];

    constructor(private readonly _absencesService: AbsencesService,
                private readonly _authService: AuthService) { }

    ngOnInit(): void {
      let ab = this._absencesService.findAll(this._authService.user._id);
      ab.subscribe((absences: any) => {
        this._absences = absences;
      });
    }

    get absences(): Absence[] {
        return this._absences;
    }

}
