import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../types/message.type';
import {AuthService} from '../../../services/auth.service';
import {User} from "../../../types/user.type";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  private _messages: Message[] = [];
  private _showFullMessage: boolean = false;
  private _selectedMessage: string = '';
  private _theSender: string = '';
  private _selectedId: string = '';
  private readonly _delete$: EventEmitter<Message[]>;

  constructor(private readonly _messagesService: MessageService, private readonly _authService: AuthService) {
    this._delete$ = new EventEmitter<Message[]>();
  }

  showMessage(message: any) {
    this._selectedId = message._id;
    this._selectedMessage = message.message;
    this._theSender = message.from;
    this._showFullMessage = true;
  }

  collapseMessageCard() {
    this._showFullMessage = false;
  }

  get showFullMessage(): boolean {
    return this._showFullMessage;
  }

  get selectedMessage(): string {
    return this._selectedMessage;
  }

  @Input()
  set messages(messages: Message[]) {
    this._messages = messages;
  }

  get messages(): Message[] {
    return this._messages;
  }

  @Output('delete')
  get delete$(): EventEmitter<Message[]> {
    return this._delete$;
  }

  deleteMessageCard() {
    this._messagesService.delete(this._selectedId).subscribe((data: Message) => {
      this._messages = this._messages.filter((m: Message) => m.message !== this.selectedMessage);
      this._showFullMessage = false;
      this._delete$.emit(this._messages);
    });
  }
}
