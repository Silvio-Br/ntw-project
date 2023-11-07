import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../../shared/types/professor.type';
import {environment} from "../../../environments/environment";
import {User} from "../types/user.type";

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  private apiUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/users/professors`);
  }

  delete(_id: String) {
    return this.http.delete(`${this.apiUrl}/users/professors/${_id}`);
  }

  create(form: User) {
    return this.http.post(`${this.apiUrl}/users/professors`, form);
  }

  findById(professeurId: String) {
    return this.http.get(`${this.apiUrl}/users/professors/${professeurId}`);
  }
}
