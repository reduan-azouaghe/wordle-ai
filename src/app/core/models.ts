// Evaluation of a single letter in a guess
export type LetterStatus = 'correct' | 'present' | 'absent';

// Overall game status
export type GameStatus = 'playing' | 'won' | 'lost';

// Game board dimensions
export interface GameConfig {
  rows: number;
  cols: number;
}

// Evaluation row for a guess; length equals `cols`
export type Evaluation = (LetterStatus | null)[];

// Map letter -> best-known status for coloring the keyboard
export type KeyStatuses = Record<string, LetterStatus>;

export const DEFAULT_KEYBOARD_ROWS: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];
