import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Absence} from "../types/absence.type";

@Injectable({
    providedIn: 'root'
})
export class AbsencesService {
    private apiUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

    constructor(private http: HttpClient) {
    }

    create(absence: Absence): Observable<Absence> {
        return this.http.post<Absence>(`${this.apiUrl}/absences`, absence);
    }

    findAll(id: string) {
        return this.http.get(`${this.apiUrl}/absences/student/${id}`);
    }

    findAllByIdProfessor(id: String) {
        return this.http.get(`${this.apiUrl}/absences/professor/${id}`);
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/absences/${id}`);
    }

    update(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/absences/etat/${id}`, data);
    }
}
