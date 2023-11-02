import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageUrl = 'http://localhost:3000/messages'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    return this.http.post(this.messageUrl, message);
  }
}
