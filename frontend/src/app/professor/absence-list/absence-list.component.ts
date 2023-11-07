import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {AbsencesService} from "../../shared/services/absences.service";
import {StudentsService} from "../../shared/services/students.service";

@Component({
  selector: 'app-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.css']
})
export class AbsenceListComponent implements OnInit {
  private _absences: any[]; // Define your absence model here
  private _currentAbsences: any[];
  searchName: string = '';
  private _nbPages: number = 1;
  private _pagesArray: number[] = [];
  private _currentPage: number = 1;

  constructor(private _absencesService: AbsencesService, private _authService: AuthService, private _studentsService: StudentsService) {
    this._absences = [];
    this._currentAbsences = [];
  }

  ngOnInit(): void {
    this._absencesService.findAllByIdProfessor(this._authService.id).subscribe((data: any) => {
      this._absences = data;
      for (let absence of this._absences) {
        this._studentsService.findById(absence.etudiantId).subscribe((data: any) => {
          absence.student = data.firstname + " " + data.lastname.toUpperCase();
        });
      }
      this._currentAbsences = this._absences.slice(0, 10);
      this._nbPages = Math.ceil(this._absences.length / 10);
      this._pagesArray = Array(this._nbPages).fill(0).map((x, i) => i + 1);
    });
  }

  get absences(): any[] {
    return this._currentAbsences;
  }

  get nbPages(): number {
    return this._nbPages;
  }

  changePage(page: number) {
    this._currentPage = page;
    this._currentAbsences = this._absences.slice((page - 1) * 10, page * 10);
  }

  filterAbsences() {
    if (this.searchName.trim() === '') {
      this._currentAbsences = this._absences.slice(0, 10);
      this._currentPage = 1;
    } else {
      // Filter absences based on the searchDate
      if (this._absences != undefined)
        this._currentAbsences = this._absences.filter((absence) => {
          return absence.student.toLowerCase().includes(this.searchName.toLowerCase());
        });
    }
  }

  deleteAbsence(id: string) {
    this._absencesService.delete(id).subscribe(() => {
      this._absences = this._absences.filter((absence) => absence._id !== id);
      this._currentAbsences = this._absences.slice(0, 10);
    });
  }

  formatAbsenceDate(dateString: string, format: string): string {
    const date = new Date(dateString);
    switch (format) {
      case 'date':
        return this.formatDate(date);
      case 'hours':
        return this.formatHours(date);
      case 'minutes':
        return this.formatMinutes(date);
      default:
        return '';
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return date.toLocaleDateString(undefined, options);
  }

  formatHours(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    return hours;
  }

  formatMinutes(date: Date): string {
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return minutes;
  }

  get pages(): number[] {
    return this._pagesArray;
  }

  updateState(absence: any) {
    this._absencesService.update(absence._id, {etat: absence.etat}).subscribe(() => {
      this._absences.filter((absence) => absence._id === absence._id)[0].etat = absence.etat;
      absence.showStateUpdate = false;
    });
  }

  toggleStateUpdate(absence: any) {
    absence.showStateUpdate = !absence.showStateUpdate;
  }

}
