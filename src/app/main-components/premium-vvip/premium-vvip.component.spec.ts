import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumVvipComponent } from './premium-vvip.component';

describe('PremiumVvipComponent', () => {
  let component: PremiumVvipComponent;
  let fixture: ComponentFixture<PremiumVvipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumVvipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumVvipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
