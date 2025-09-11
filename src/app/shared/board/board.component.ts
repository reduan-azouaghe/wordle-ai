import { Component, Input, computed } from '@angular/core';
import { Evaluation } from '../../core/models';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  // Board configuration and data
  @Input({ required: true }) rows = 6;
  @Input({ required: true }) cols = 5;
  @Input({ required: true }) guesses: string[] = [];
  @Input({ required: true }) results: Evaluation[] = [];

  // Derived indices for *ngFor loops (readability)
  rowIndices = computed(() => Array.from({ length: this.rows }, (_, i) => i));
  colIndices = computed(() => Array.from({ length: this.cols }, (_, i) => i));

  /** Return the CSS class for a cell given its evaluation status. */
  cellClassFor(status: Evaluation[number]): string {
    return status ? `cell ${status}` : 'cell';
  }

  /** Return the character displayed at a given row/column. */
  getCellCharacter(rowIndex: number, colIndex: number): string {
    const row = this.guesses[rowIndex] ?? '';
    return row.charAt(colIndex);
  }
}
