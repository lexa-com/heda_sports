import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumTenComponent } from './premium-ten.component';

describe('PremiumTenComponent', () => {
  let component: PremiumTenComponent;
  let fixture: ComponentFixture<PremiumTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumTenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
