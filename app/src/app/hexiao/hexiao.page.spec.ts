import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexiaoPage } from './hexiao.page';

describe('HexiaoPage', () => {
  let component: HexiaoPage;
  let fixture: ComponentFixture<HexiaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexiaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexiaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
