import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JifenorderinfoPage } from './jifenorderinfo.page';

describe('JifenorderinfoPage', () => {
  let component: JifenorderinfoPage;
  let fixture: ComponentFixture<JifenorderinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JifenorderinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JifenorderinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
