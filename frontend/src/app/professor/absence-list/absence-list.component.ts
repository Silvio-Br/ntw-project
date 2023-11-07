import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {AbsencesService} from "../../shared/services/absences.service";
import {StudentsService} from "../../shared/services/students.service";

@Component({
    selector: 'app-absence-list',
    templateUrl: './absence-list.component.html',
    styleUrls: ['./absence-list.component.css']
})
export class AbsenceListComponent {
    private _absences: any[]; // Define your absence model here
    searchDate: string = '';

    constructor(private _absencesService: AbsencesService, private _authService: AuthService, private _studentsService: StudentsService) {
        this._absences = [];
    }

    ngOnInit(): void {
        this.loadAbsences();
    }

    loadAbsences() {
        this._absencesService.findAllByIdProfessor(this._authService.id).subscribe((data: any) => {
            this._absences = data;
            for (let absence of this._absences) {
                this._studentsService.findById(absence.etudiantId).subscribe((data: any) => {
                    absence.student = data.firstname + " " + data.lastname;
                });
            }
        });
    }

    get absences(): any[] {
        return this._absences;
    }

    filterAbsences() {
        if (this.searchDate.trim() === '') {
            // If the search input is empty, show all absences
            this.loadAbsences();
        } else {
            // Filter absences based on the searchDate
            if (this._absences != undefined)
                this._absences = this._absences.filter((absence) => {
                    const formattedDate = new Date(absence.date).toDateString(); // Format the date as needed
                    return formattedDate.includes(this.searchDate);
                });
        }
    }

    deleteAbsence(id: string) {
        this._absencesService.delete(id).subscribe(() => {
            // Assuming you want to refresh the list after deletion
            this.loadAbsences();
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

    updateState(absence: any) {
        this._absencesService.update(absence._id, {etat: absence.etat}).subscribe(() => {
            // Assuming you want to refresh the list after the update
            this.loadAbsences();
        });
    }

    toggleStateUpdate(absence: any) {
        absence.showStateUpdate = !absence.showStateUpdate;
    }

}
