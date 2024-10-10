import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipstersViewComponent } from './tipsters-view.component';

describe('TipstersViewComponent', () => {
  let component: TipstersViewComponent;
  let fixture: ComponentFixture<TipstersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipstersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipstersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
