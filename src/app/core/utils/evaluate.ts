import { LetterStatus } from '../models';

/**
 * Evaluate a guess against the answer using Wordle rules.
 * - "correct": letter matches in the correct position
 * - "present": letter exists elsewhere in the answer (respecting duplicates)
 * - "absent": letter does not exist in remaining unmatched letters of the answer
 */
export function evaluateGuess(guess: string, answer: string, length: number): LetterStatus[] {
  const evaluation: (LetterStatus | null)[] = Array.from({ length }, () => null);
  const remainingAnswerLetterCounts: Record<string, number> = {};

  // First pass: mark exact matches and count the remaining unmatched answer letters.
  for (let index = 0; index < length; index++) {
    const guessChar = guess[index];
    const answerChar = answer[index];
    if (guessChar === answerChar) {
      evaluation[index] = 'correct';
    } else {
      remainingAnswerLetterCounts[answerChar] = (remainingAnswerLetterCounts[answerChar] ?? 0) + 1;
    }
  }

  // Second pass: mark present vs absent for non-exact positions, respecting remaining counts.
  for (let index = 0; index < length; index++) {
    if (evaluation[index]) continue; // already marked "correct"
    const guessChar = guess[index];
    if ((remainingAnswerLetterCounts[guessChar] ?? 0) > 0) {
      evaluation[index] = 'present';
      remainingAnswerLetterCounts[guessChar]! -= 1;
    } else {
      evaluation[index] = 'absent';
    }
  }

  return evaluation as LetterStatus[];
}
