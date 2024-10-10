import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipstersDetailsComponent } from './tipsters-details.component';

describe('TipstersDetailsComponent', () => {
  let component: TipstersDetailsComponent;
  let fixture: ComponentFixture<TipstersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipstersDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipstersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
