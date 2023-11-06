import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../types/message.type';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
    private _messages: Message[] = [];
    private _showFullMessage: boolean = false;
    private _selectedMessage: string = '';
    private _theSender: string = '';
    private _selectedId: string = '';

    constructor(private messageService: MessageService, private aut: AuthService) {
    }

    ngOnInit(): void {
        this.messageService.findAll(this.aut.email).subscribe((data: Message[]) => {
            this._messages = data;
        });
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

    get theSender(): string {
        return this._theSender;
    }

    get selectedMessageId(): string {
        return this._selectedId;
    }

    get messages(): Message[] {
        return this._messages;
    }

    deleteMessageCard() {
        this.messageService.delete(this._selectedId).subscribe((data: Message) => {
            this._messages = this._messages.filter((m: Message) => m.message !== this.selectedMessage);
            this._showFullMessage = false;
        });
    }
}
