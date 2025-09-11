import { TestBed } from '@angular/core/testing';
import { WordleService } from './wordle.service';
import { DictionaryService } from './dictionary.service';
import { DEFAULT_CONFIG, WORDLE_CONFIG } from '../../core/config';
import { LetterStatus } from '../../core/models';

describe('WordleService', () => {
  let service: WordleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DictionaryService,
        WordleService,
        { provide: WORDLE_CONFIG, useValue: DEFAULT_CONFIG },
      ],
    });
    service = TestBed.inject(WordleService);
  });

  it('initializes with empty guesses and a solution', () => {
    expect(service.guesses().length).toBe(DEFAULT_CONFIG.rows);
    expect(service.guesses().every((g) => g === '')).toBeTrue();
    expect(service.solution().length).toBe(DEFAULT_CONFIG.cols);
    expect(service.gameStatus()).toBe('playing');
  });

  it('typeLetter and backspace update the current guess correctly', () => {
    service.typeLetter('a');
    service.typeLetter('p');
    expect(service.guesses()[service.currentRow()]).toBe('AP');
    service.backspace();
    expect(service.guesses()[service.currentRow()]).toBe('A');

    // Fill row to cols length, additional letters are ignored
    for (let i = 0; i < DEFAULT_CONFIG.cols; i++) {
      service.typeLetter('x');
    }
    expect(service.guesses()[service.currentRow()].length).toBe(DEFAULT_CONFIG.cols);
  });

  it('shows message for short or invalid guesses', () => {
    service.typeLetter('a');
    service.submitGuess();
    expect(service.message()).toBe('Not enough letters');

    // Clear row and set an invalid full-length word
    service.backspace();
    const invalid = 'XXXXX';
    for (const ch of invalid) service.typeLetter(ch);
    service.submitGuess();
    expect(service.message()).toBe('Not in word list');
  });

  it('wins when the guess equals the solution and sets all correct', () => {
    // Force a known solution and guess it
    service.reset();
    service.solution.set('APPLE');
    for (const ch of 'APPLE') service.typeLetter(ch);
    service.submitGuess();
    expect(service.gameStatus()).toBe('won');
    const row = service.currentRow();
    const evalRow = service.results()[row];
    expect(evalRow).toEqual(Array(DEFAULT_CONFIG.cols).fill('correct' as LetterStatus));
  });

  it('advances rows and updates keyboard statuses with precedence', () => {
    service.reset();
    service.solution.set('APPLE');
    // First guess: GRAPE (in dictionary) → mix of present/absent/correct
    for (const ch of 'GRAPE') service.typeLetter(ch);
    service.submitGuess();
    expect(service.currentRow()).toBe(1);
    expect(service.keyStatuses()['E']).toBe('correct'); // last letter matches
    expect(service.keyStatuses()['A']).toBe('present');
    expect(service.keyStatuses()['G']).toBe('absent');

    // Second guess: APPLE → all correct; should upgrade L to correct
    for (const ch of 'APPLE') service.typeLetter(ch);
    service.submitGuess();
    expect(service.gameStatus()).toBe('won');
    expect(service.keyStatuses()['A']).toBe('correct');
  });
});
