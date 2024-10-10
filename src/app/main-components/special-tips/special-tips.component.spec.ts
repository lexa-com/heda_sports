import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTipsComponent } from './special-tips.component';

describe('SpecialTipsComponent', () => {
  let component: SpecialTipsComponent;
  let fixture: ComponentFixture<SpecialTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialTipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
