import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "../shared/services/message.service";
import {Message} from "../shared/types/message.type";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private _messages: Message[] = [];

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _messagesService: MessageService) {
  }

  ngOnInit(): void {
    this._messagesService.findAll(this._authService.email).subscribe((data: Message[]) => {
      this._messages = data;
    });
  }

  get messages(): Message[] {
    return this._messages;
  }

  get numberOfMessages(): number {
    return this._messages.length;
  }

  updateMessages(messages: Message[]): void {
    this._messages = messages;
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
  get isLoginPage(): boolean {
    return window.location.pathname === '/login';
  }

  get isStudent(): boolean {
    // check user role is student
    return this._authService.isStudent();
  }

  get isAdmin(): boolean {
    // check user role is admin
    return this._authService.isAdmin();
  }

  get isProfessor(): boolean {
    // check user role is professor
    return this._authService.isProfessor();
  }

  get firstName(): string {
    // get user first name
    return this._authService.firstName;
  }

  get lastName(): string {
    // get user last name
    return this._authService.lastName;
  }



}
