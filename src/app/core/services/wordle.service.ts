import { Injectable, computed, inject, signal } from '@angular/core';
import { DEFAULT_KEYBOARD_ROWS, Evaluation, GameStatus, KeyStatuses } from '../models';
import { WORDLE_CONFIG } from '../config';
import { DictionaryService } from './dictionary.service';
import { evaluateGuess } from '../utils/evaluate';

@Injectable({ providedIn: 'root' })
export class WordleService {
  // Dependencies and configuration
  private readonly config = inject(WORDLE_CONFIG);
  private readonly dictionary = inject(DictionaryService);

  // Game configuration
  readonly rows = this.config.rows;
  readonly cols = this.config.cols;

  // Game state
  readonly guesses = signal<string[]>(Array.from({ length: this.rows }, () => ''));
  readonly results = signal<Evaluation[]>(
    Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => null))
  );
  readonly currentRow = signal(0);
  readonly message = signal<string | null>(null);
  readonly gameStatus = signal<GameStatus>('playing');
  readonly keyStatuses = signal<KeyStatuses>({});
  readonly solution = signal<string>(this.dictionary.randomSolution());

  // Derived state and constants
  readonly isFinished = computed(() => this.gameStatus() !== 'playing');
  readonly rowIndexes = Array.from({ length: this.rows }, (_, i) => i);
  readonly colIndexes = Array.from({ length: this.cols }, (_, i) => i);
  readonly keyboardRows = DEFAULT_KEYBOARD_ROWS;

  /** Add a letter to the current guess (if space remains). */
  typeLetter(letter: string) {
    if (this.isFinished()) return;

    const rowIndex = this.currentRow();
    const updatedGuesses = [...this.guesses()];
    const currentGuess = updatedGuesses[rowIndex];

    if (currentGuess.length >= this.cols) return;

    updatedGuesses[rowIndex] = currentGuess + letter.toUpperCase();
    this.guesses.set(updatedGuesses);
    this.clearMessage();
  }

  /** Remove the last letter in the current guess. */
  backspace() {
    if (this.isFinished()) return;

    const rowIndex = this.currentRow();
    const updatedGuesses = [...this.guesses()];
    const currentGuess = updatedGuesses[rowIndex];

    if (currentGuess.length === 0) return;

    updatedGuesses[rowIndex] = currentGuess.slice(0, -1);
    this.guesses.set(updatedGuesses);
    this.clearMessage();
  }

  /** Submit the current guess and update the board/keyboard status. */
  submitGuess() {
    if (this.isFinished()) return;

    const rowIndex = this.currentRow();
    const guess = this.guesses()[rowIndex];

    if (guess.length < this.cols) return this.showMessage('Not enough letters');
    if (!this.dictionary.isValid(guess)) return this.showMessage('Not in word list');

    const evaluation = evaluateGuess(guess, this.solution(), this.cols);
    const resultGrid = this.results().map((row) => [...row]);
    resultGrid[rowIndex] = evaluation;
    this.results.set(resultGrid);

    // Update keyboard statuses with precedence: correct > present > absent
    const statuses = { ...this.keyStatuses() } as KeyStatuses;
    const precedence = { absent: 0, present: 1, correct: 2 } as const;

    for (let colIndex = 0; colIndex < this.cols; colIndex++) {
      const char = guess[colIndex];
      const status = evaluation[colIndex]!;
      const existing = statuses[char];
      
      if (!existing || precedence[status] > precedence[existing]) {
        statuses[char] = status;
      }
    }

    this.keyStatuses.set(statuses);

    // Win / advance / lose
    if (guess === this.solution()) {
      this.gameStatus.set('won');
      this.showMessage('Genius!');

      return;
    }
    if (rowIndex + 1 >= this.rows) {
      this.gameStatus.set('lost');
      this.showMessage(`The word was ${this.solution()}`);

      return;
    }

    this.currentRow.set(rowIndex + 1);
  }

  /** Show a transient message in the UI. */
  showMessage(message: string) {
    this.message.set(message);

    setTimeout(() => {
      if (this.message() === message && this.gameStatus() === 'playing') this.message.set(null);
    }, 1500);
  }

  /** Clear any existing message while the game is in progress. */
  clearMessage() {
    if (this.gameStatus() === 'playing') this.message.set(null);
  }

  /** Reset the entire game to a new random solution. */
  reset() {
    this.guesses.set(Array.from({ length: this.rows }, () => ''));

    this.results.set(
      Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => null))
    );
    
    this.currentRow.set(0);
    this.message.set(null);
    this.gameStatus.set('playing');
    this.keyStatuses.set({});
    this.solution.set(this.dictionary.randomSolution());
  }
}
