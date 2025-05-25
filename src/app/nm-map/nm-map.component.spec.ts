import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmMapComponent } from './nm-map.component';

describe('NmMapComponent', () => {
  let component: NmMapComponent;
  let fixture: ComponentFixture<NmMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NmMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NmMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
