import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { DEFAULT_CONFIG, WORDLE_CONFIG } from './core/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: WORDLE_CONFIG, useValue: DEFAULT_CONFIG },
  ]
};
