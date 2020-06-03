import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YaoqinhaibaoPage } from './yaoqinhaibao.page';

describe('YaoqinhaibaoPage', () => {
  let component: YaoqinhaibaoPage;
  let fixture: ComponentFixture<YaoqinhaibaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YaoqinhaibaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaoqinhaibaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
