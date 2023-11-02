import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  showFullMessage: boolean = false;
  selectedMessage: string = '';
  thesender: string = '';
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.findAll().subscribe((data: Message[]) => {
      this.messages = data;
    });
  }
  showMessage(message: any) {
    this.selectedMessage = message.message;
    this.thesender =message.from;
    this.showFullMessage = true;
  }

  collapseMessageCard() {
    this.showFullMessage = false;
  }
}
