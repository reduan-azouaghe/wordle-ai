import { Component, HostListener, inject } from '@angular/core';
import { WordleService } from '../../core/services/wordle.service';
import { BoardComponent } from '../../shared/board/board.component';
import { KeyboardComponent } from '../../shared/keyboard/keyboard.component';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [BoardComponent, KeyboardComponent],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent {
  /** Wordle gameplay service (state + actions). */
  protected game = inject(WordleService);

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (this.game.isFinished()) return;
    const key = event.key;
    if (key === 'Enter') { event.preventDefault(); this.game.submitGuess(); return; }
    if (key === 'Backspace' || key === 'Delete') { event.preventDefault(); this.game.backspace(); return; }
    if (/^[a-zA-Z]$/.test(key)) this.game.typeLetter(key.toUpperCase());
  }

  handleVirtualKey(key: string) {
    if (this.game.isFinished()) return;
    if (key === 'ENTER') return this.game.submitGuess();
    if (key === 'DEL') return this.game.backspace();
    this.game.typeLetter(key);
  }
}
