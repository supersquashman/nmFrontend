import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LscCalculatorComponent } from './lsc-calculator.component';

describe('LscCalculatorComponent', () => {
  let component: LscCalculatorComponent;
  let fixture: ComponentFixture<LscCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LscCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LscCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
