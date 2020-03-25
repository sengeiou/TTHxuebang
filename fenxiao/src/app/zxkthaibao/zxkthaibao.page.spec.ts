import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZxkthaibaoPage } from './zxkthaibao.page';

describe('ZxkthaibaoPage', () => {
  let component: ZxkthaibaoPage;
  let fixture: ComponentFixture<ZxkthaibaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZxkthaibaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZxkthaibaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
