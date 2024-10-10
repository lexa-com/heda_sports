import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumHomeComponent } from './premium-home.component';

describe('PremiumHomeComponent', () => {
  let component: PremiumHomeComponent;
  let fixture: ComponentFixture<PremiumHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
