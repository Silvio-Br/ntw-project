import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl);
  }
}
