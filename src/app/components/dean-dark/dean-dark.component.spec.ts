import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanDarkComponent } from './dean-dark.component';

describe('DeanDarkComponent', () => {
  let component: DeanDarkComponent;
  let fixture: ComponentFixture<DeanDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeanDarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeanDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
