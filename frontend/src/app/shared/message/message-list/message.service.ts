import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesUrl = 'http://localhost:3000/messages'; // Base URL

  constructor(private http: HttpClient) {}

  findAll(to: string): Observable<Message[]> {
    // Construct the URL with the dynamic "to" parameter
    const url = `${this.messagesUrl}/to/${to}`;

    return this.http.get<Message[]>(url);
  }
}
