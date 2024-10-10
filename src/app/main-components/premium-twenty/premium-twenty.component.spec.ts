import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumTwentyComponent } from './premium-twenty.component';

describe('PremiumTwentyComponent', () => {
  let component: PremiumTwentyComponent;
  let fixture: ComponentFixture<PremiumTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumTwentyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
