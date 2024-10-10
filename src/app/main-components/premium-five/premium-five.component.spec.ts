import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumFiveComponent } from './premium-five.component';

describe('PremiumFiveComponent', () => {
  let component: PremiumFiveComponent;
  let fixture: ComponentFixture<PremiumFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumFiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
