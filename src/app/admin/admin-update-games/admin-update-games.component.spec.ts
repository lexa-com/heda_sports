import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateGamesComponent } from './admin-update-games.component';

describe('AdminUpdateGamesComponent', () => {
  let component: AdminUpdateGamesComponent;
  let fixture: ComponentFixture<AdminUpdateGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpdateGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUpdateGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
