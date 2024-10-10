import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwayWinsComponent } from './away-wins.component';

describe('AwayWinsComponent', () => {
  let component: AwayWinsComponent;
  let fixture: ComponentFixture<AwayWinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwayWinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwayWinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
