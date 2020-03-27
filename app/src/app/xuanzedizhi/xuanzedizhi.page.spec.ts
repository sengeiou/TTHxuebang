import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuanzedizhiPage } from './xuanzedizhi.page';

describe('XuanzedizhiPage', () => {
  let component: XuanzedizhiPage;
  let fixture: ComponentFixture<XuanzedizhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuanzedizhiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuanzedizhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
