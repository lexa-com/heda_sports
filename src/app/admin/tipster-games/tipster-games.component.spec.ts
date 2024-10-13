import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterGamesComponent } from './tipster-games.component';

describe('TipsterGamesComponent', () => {
  let component: TipsterGamesComponent;
  let fixture: ComponentFixture<TipsterGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsterGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipsterGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
