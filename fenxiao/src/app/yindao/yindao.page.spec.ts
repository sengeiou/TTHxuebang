import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YindaoPage } from './yindao.page';

describe('YindaoPage', () => {
  let component: YindaoPage;
  let fixture: ComponentFixture<YindaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YindaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YindaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
