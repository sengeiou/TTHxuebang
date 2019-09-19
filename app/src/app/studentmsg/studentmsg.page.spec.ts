import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmsgPage } from './studentmsg.page';

describe('StudentmsgPage', () => {
  let component: StudentmsgPage;
  let fixture: ComponentFixture<StudentmsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmsgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
