import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterAddGamesComponent } from './tipster-add-games.component';

describe('TipsterAddGamesComponent', () => {
  let component: TipsterAddGamesComponent;
  let fixture: ComponentFixture<TipsterAddGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsterAddGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipsterAddGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
