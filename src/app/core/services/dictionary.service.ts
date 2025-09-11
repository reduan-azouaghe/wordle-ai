import { Injectable } from '@angular/core';

/** Simple in-memory dictionary for 5-letter words. */
@Injectable({ providedIn: 'root' })
export class DictionaryService {
  private readonly words: string[] = [
    'ABOUT','OTHER','WHICH','THEIR','THERE','FIRST','WOULD','THESE','CLICK','SMILE',
    'APPLE','GRAPE','BERRY','MANGO','LEMON','PEACH','PEARL','PLANT','BLADE','CHAIR',
    'TABLE','WATER','EARTH','METAL','STONE','BRICK','CLOUD','STORM','WINDY','RAINY',
    'LIGHT','NIGHT','SWEET','SALTY','SPICE','SUGAR','HONEY','COCOA','BREAD',
    'EAGER','ROBOT','HUMAN','ANGEL','GHOST','MAGIC','DRIFT','SHORE','OCEAN',
    'RIVER','MOUSE','HORSE','SHEEP','CAMEL','ZEBRA','TIGER','EAGLE','RAVEN',
    'QUIET','NOISE','AUDIO','MUSIC','PIANO','DRUMS','VIOLA','CELLO','GAMER','LEVEL',
    'QUEST','SKILL','ROUND','SCORE','POINT','MATCH','WINNER','LOSER','TRIAL','ERROR',
    'DEBUG','BUILD','SERVE','DEPLOY','ANGRY','HAPPY','FAITH','TRUST','TRUTH',
    'FALSE','UNITY','ARRAY','FRAME','MODEL','GUESS','WORDS','WORLD','VALUE','LOGIC'
  ]
    .map((word) => word.toUpperCase())
    .filter((word) => word.length === 5 && /^[A-Z]{5}$/.test(word));

  /** Returns true if the word is in the dictionary. */
  isValid(word: string): boolean {
    const upper = word.toUpperCase();
    return this.words.includes(upper);
  }

  /** Returns a random solution from the dictionary. */
  randomSolution(): string {
    const index = Math.floor(Math.random() * this.words.length);
    return this.words[index];
  }
}
