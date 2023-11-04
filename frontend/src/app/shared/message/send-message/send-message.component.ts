import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  messages: any = {
    from: '',
    to: '',
    message: ''
  };
  success = false; // Initially, there is no success

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private aut:AuthService
  ) {
    this.route.params.subscribe(params => {
      this.messages.to = params['email'];
      this.messages.from= this.aut.email
      console.log(this.messages.to )// Get the email parameter from the route
    });
  }

  onSubmit() {
    this.messageService.sendMessage(this.messages).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        // You can reset the form or perform other actions here
        this.success = true;
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
}
