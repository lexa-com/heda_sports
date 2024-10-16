import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaywallComponent } from './test-paywall.component';

describe('TestPaywallComponent', () => {
  let component: TestPaywallComponent;
  let fixture: ComponentFixture<TestPaywallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPaywallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestPaywallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
