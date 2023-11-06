import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent {
  @Input() fullMessage: string | undefined;
  @Input() thesender: string | undefined;
  @Output() collapsed = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  collapseCard() {
    this.collapsed.emit();
  }

  deleteCard() {
    this.deleted.emit();
  }
}
