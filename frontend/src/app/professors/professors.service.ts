// professor.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiUrl = 'http://localhost:3000/professors';

  constructor(private http: HttpClient) {}

  getAllProfessors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
