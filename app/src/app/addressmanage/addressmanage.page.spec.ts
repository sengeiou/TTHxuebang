import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressmanagePage } from './addressmanage.page';

describe('AddressmanagePage', () => {
  let component: AddressmanagePage;
  let fixture: ComponentFixture<AddressmanagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressmanagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressmanagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
