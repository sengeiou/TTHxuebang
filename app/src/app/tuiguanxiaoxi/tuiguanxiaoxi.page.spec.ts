import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuiguanxiaoxiPage } from './tuiguanxiaoxi.page';

describe('TuiguanxiaoxiPage', () => {
  let component: TuiguanxiaoxiPage;
  let fixture: ComponentFixture<TuiguanxiaoxiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuiguanxiaoxiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuiguanxiaoxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
