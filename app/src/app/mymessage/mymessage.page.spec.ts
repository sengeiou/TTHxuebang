import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymessagePage } from './mymessage.page';

describe('MymessagePage', () => {
  let component: MymessagePage;
  let fixture: ComponentFixture<MymessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymessagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
