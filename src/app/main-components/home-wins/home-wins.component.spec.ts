import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWinsComponent } from './home-wins.component';

describe('HomeWinsComponent', () => {
  let component: HomeWinsComponent;
  let fixture: ComponentFixture<HomeWinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeWinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeWinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
