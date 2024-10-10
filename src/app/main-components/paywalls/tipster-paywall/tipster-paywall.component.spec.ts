import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterPaywallComponent } from './tipster-paywall.component';

describe('TipsterPaywallComponent', () => {
  let component: TipsterPaywallComponent;
  let fixture: ComponentFixture<TipsterPaywallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsterPaywallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipsterPaywallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
