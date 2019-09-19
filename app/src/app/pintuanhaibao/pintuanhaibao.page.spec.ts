import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PintuanhaibaoPage } from './pintuanhaibao.page';

describe('PintuanhaibaoPage', () => {
  let component: PintuanhaibaoPage;
  let fixture: ComponentFixture<PintuanhaibaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PintuanhaibaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PintuanhaibaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
