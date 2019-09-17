import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityselectPage } from './cityselect.page';

describe('CityselectPage', () => {
  let component: CityselectPage;
  let fixture: ComponentFixture<CityselectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityselectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
