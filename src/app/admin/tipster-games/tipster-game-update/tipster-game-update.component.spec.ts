import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterGameUpdateComponent } from './tipster-game-update.component';

describe('TipsterGameUpdateComponent', () => {
  let component: TipsterGameUpdateComponent;
  let fixture: ComponentFixture<TipsterGameUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsterGameUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipsterGameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
