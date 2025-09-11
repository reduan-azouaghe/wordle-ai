import { InjectionToken } from '@angular/core';
import { GameConfig } from './models';

export const WORDLE_CONFIG = new InjectionToken<GameConfig>('WORDLE_CONFIG');

export const DEFAULT_CONFIG: GameConfig = {
  rows: 6,
  cols: 5,
};

