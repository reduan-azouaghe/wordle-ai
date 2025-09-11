import { evaluateGuess } from './evaluate';
import { LetterStatus } from '../models';

describe('evaluateGuess', () => {
  it('marks correct letters', () => {
    expect(evaluateGuess('APPLE', 'APPLE', 5)).toEqual([
      'correct', 'correct', 'correct', 'correct', 'correct'
    ]);
  });

  it('handles present and absent with duplicates', () => {
    // Guess:  A L L E Y
    // Answer: A P P L E
    // Result: ✓ L(✓) L(x) E(✓) Y(x) → [correct, present, absent, present, absent]
    const expected: LetterStatus[] = ['correct', 'present', 'absent', 'present', 'absent'];
    expect(evaluateGuess('ALLEY', 'APPLE', 5)).toEqual(expected);
  });
});
