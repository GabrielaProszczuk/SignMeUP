import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDarkComponent } from './student-dark.component';

describe('StudentDarkComponent', () => {
  let component: StudentDarkComponent;
  let fixture: ComponentFixture<StudentDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
