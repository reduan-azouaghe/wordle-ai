import { TestBed } from '@angular/core/testing';
import { KeyboardComponent } from './keyboard.component';

describe('KeyboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardComponent],
    }).compileComponents();
  });

  it('emits keyPressed when a key is clicked', () => {
    const fixture = TestBed.createComponent(KeyboardComponent);
    const comp = fixture.componentInstance;
    comp.keyboardRows = [['A']];
    comp.keyStatuses = {};
    fixture.detectChanges();

    let emitted = '';
    comp.keyPressed.subscribe((k) => (emitted = k));

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(emitted).toBe('A');
  });
});

