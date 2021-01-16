import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDarkComponent } from './admin-dark.component';

describe('AdminDarkComponent', () => {
  let component: AdminDarkComponent;
  let fixture: ComponentFixture<AdminDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
