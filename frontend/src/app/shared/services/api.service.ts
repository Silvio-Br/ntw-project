import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

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

  update(id: string, form: any, role: string) {
    return this.http.put(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/api/${role}s/${id}`, form);
  }

  getAbsences(id: string) {
    return this.http.get(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/api/absences/student/${id}`);
  }
}
