import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuebangPage } from './xuebang.page';

describe('XuebangPage', () => {
  let component: XuebangPage;
  let fixture: ComponentFixture<XuebangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuebangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuebangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
