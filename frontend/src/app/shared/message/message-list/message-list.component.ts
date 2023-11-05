import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from './message';
import { AuthService } from '../../services/auth.service';

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
  selectedId: string = '';
  constructor(private messageService: MessageService,private aut:AuthService) {}

  ngOnInit(): void {
    this.messageService.findAll(this.aut.email).subscribe((data: Message[]) => {
      this.messages = data;
      console.log(this.aut.email)
    });
  }
  showMessage(message: any) {
    this.selectedId = message._id;
    this.selectedMessage = message.message;
    this.thesender =message.from;
    this.showFullMessage = true;
  }

  collapseMessageCard() {
    this.showFullMessage = false;
  }

  deleteMessageCard() {
    this.messageService.delete(this.selectedId).subscribe((data: Message) => {
      this.messages = this.messages.filter((m: Message) => m.message !== this.selectedMessage);
      this.showFullMessage = false;
    });
  }
}
