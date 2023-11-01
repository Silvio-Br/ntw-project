import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/api/auth/login`, {
      email,
      password,
    });
  }

  getProfessors() {
    return this.http.get(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/api/professors`);
  }

  getStudents() {
    return this.http.get(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/api/students`);
  }

}
