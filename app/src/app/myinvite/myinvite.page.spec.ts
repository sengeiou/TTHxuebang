import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinvitePage } from './myinvite.page';

describe('MyinvitePage', () => {
  let component: MyinvitePage;
  let fixture: ComponentFixture<MyinvitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyinvitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinvitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
