import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XianxiaPage } from './xianxia.page';

describe('XianxiaPage', () => {
  let component: XianxiaPage;
  let fixture: ComponentFixture<XianxiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XianxiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XianxiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
