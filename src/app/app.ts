import { Component } from '@angular/core';
import { WordleComponent } from './features/wordle/wordle.component';

@Component({
  selector: 'app-root',
  imports: [WordleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
