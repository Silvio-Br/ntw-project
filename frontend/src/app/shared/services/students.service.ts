import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../shared/types/student.type';
import {environment} from "../../../environments/environment";
import {User} from "../types/user.type";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/users/students`);
  }

  findById(_id: String) {
    return this.http.get(`${this.apiUrl}/users/students/${_id}`);
  }

  delete(_id: String) {
    return this.http.delete(`${this.apiUrl}/users/students/${_id}`);
  }

  create(form: User) {
    return this.http.post(`${this.apiUrl}/users/students`, form);
  }
}
