import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../types/user.type";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/users/login`, {
      email,
      password,
    });
  }

  update(id: string, form: any, role: string) {
    return this.http.put(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/users/${role}s/${id}`, form);
  }

  getAbsences(id: string) {
    return this.http.get(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/absences/student/${id}`);
  }

  create(form: User, role: string) {
    return this.http.post(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/users/${role}s`, form);
  }
}
