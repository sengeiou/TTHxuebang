import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypingcePage } from './mypingce.page';

describe('MypingcePage', () => {
  let component: MypingcePage;
  let fixture: ComponentFixture<MypingcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypingcePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypingcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
