import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyStatuses } from '../../core/models';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {
  /** Keyboard rows, e.g., [[Q..P],[A..L],[ENTER..DEL]] */
  @Input({ required: true }) keyboardRows: string[][] = [];
  /** Mapping from letter to evaluation status (for coloring). */
  @Input({ required: true }) keyStatuses: KeyStatuses = {};

  /** Emits when a key is pressed on the on-screen keyboard. */
  @Output() keyPressed = new EventEmitter<string>();

  onClick(key: string) {
    this.keyPressed.emit(key);
  }

  keyClass(key: string): string {
    const status = this.keyStatuses[key];
    return status ? `key ${status}` : 'key';
  }
}
