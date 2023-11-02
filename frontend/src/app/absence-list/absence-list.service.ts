import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AbsenceListService {
  private apiUrl = 'http://localhost:3000/absences'; // Replace with your NestJS API URL
  private apiUrlupdtae = 'http://localhost:3000/absences/etat'
  constructor(private http: HttpClient) { }

  getAllAbsences() {
    return this.http.get(this.apiUrl);
  }
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  update(id: string, data: any) {
    return this.http.put(`${this.apiUrlupdtae}/${id}`, data);
  }
 
}
