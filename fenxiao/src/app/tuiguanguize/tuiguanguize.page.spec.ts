import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuiguanguizePage } from './tuiguanguize.page';

describe('TuiguanguizePage', () => {
  let component: TuiguanguizePage;
  let fixture: ComponentFixture<TuiguanguizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuiguanguizePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuiguanguizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
