import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../shared/types/message.type';
import { AuthService } from './auth.service';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/messages`;

  constructor(private http: HttpClient) {}

  findAll(to: string): Observable<Message[]> {
    // Construct the URL with the dynamic "to" parameter
    const url = `${this.messagesUrl}/to/${to}`;

    return this.http.get<Message[]>(url);
  }

  sendMessage(message: any) {
    return this.http.post(this.messagesUrl, message);
  }

  delete(message: string): Observable<Message> {
    // Construct the URL with the dynamic "id" parameter
    const url = `${this.messagesUrl}/${message}`;

    return this.http.delete<Message>(url);
  }
}
