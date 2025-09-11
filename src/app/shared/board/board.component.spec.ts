import { TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
    }).compileComponents();
  });

  it('renders letters and classes from inputs', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const comp = fixture.componentInstance;
    comp.rows = 1;
    comp.cols = 5;
    comp.guesses = ['APPLE'];
    comp.results = [['correct', 'present', 'absent', 'present', 'correct']];
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('.cell');
    expect(cells.length).toBe(5);
    expect(cells[0].textContent.trim()).toBe('A');
    expect(cells[0].className).toContain('correct');
  });
});

