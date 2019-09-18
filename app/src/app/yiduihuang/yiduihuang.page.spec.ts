import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YiduihuangPage } from './yiduihuang.page';

describe('YiduihuangPage', () => {
  let component: YiduihuangPage;
  let fixture: ComponentFixture<YiduihuangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YiduihuangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YiduihuangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
