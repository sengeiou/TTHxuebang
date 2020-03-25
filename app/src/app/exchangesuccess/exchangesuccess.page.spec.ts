import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesuccessPage } from './exchangesuccess.page';

describe('ExchangesuccessPage', () => {
  let component: ExchangesuccessPage;
  let fixture: ComponentFixture<ExchangesuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
