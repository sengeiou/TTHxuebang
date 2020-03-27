import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingcejieguoPage } from './pingcejieguo.page';

describe('PingcejieguoPage', () => {
  let component: PingcejieguoPage;
  let fixture: ComponentFixture<PingcejieguoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingcejieguoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingcejieguoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
