import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingceindexPage } from './pingceindex.page';

describe('PingceindexPage', () => {
  let component: PingceindexPage;
  let fixture: ComponentFixture<PingceindexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingceindexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingceindexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
