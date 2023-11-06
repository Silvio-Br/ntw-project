import {Component} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SendMessage} from "../../../types/send-message.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
    private _message: SendMessage = {} as SendMessage;
    private _success = false; // Initially, there is no success
    private _form: FormGroup;


    constructor(
        private messageService: MessageService,
        private route: ActivatedRoute,
        private aut: AuthService
    ) {
        this.route.params.subscribe(params => {
            this._message.to = params['email'];
            this._message.from = this.aut.email
        });
        this._form = this._buildForm();
    }


    private _buildForm(): FormGroup {
        return new FormGroup({
            message: new FormControl('', [Validators.required, Validators.minLength(5)]),
        });
    }

    get form(): FormGroup {
        return this._form;
    }

    get success(): boolean {
        return this._success;
    }

    onSubmit() {
        this._message.message = this._form.value.message;
        this.messageService.sendMessage(this._message).subscribe(
            (response) => {
                console.log('Message sent successfully:', response);
                // You can reset the form or perform other actions here
                this._success = true;
            },
            (error) => {
                console.error('Error sending message:', error);
            }
        );
    }
}
