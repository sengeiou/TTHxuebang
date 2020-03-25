import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuiyuanfuwuPage } from './huiyuanfuwu.page';

describe('HuiyuanfuwuPage', () => {
  let component: HuiyuanfuwuPage;
  let fixture: ComponentFixture<HuiyuanfuwuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuiyuanfuwuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuiyuanfuwuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
