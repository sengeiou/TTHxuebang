import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KchaibaoPage } from './kchaibao.page';

describe('KchaibaoPage', () => {
  let component: KchaibaoPage;
  let fixture: ComponentFixture<KchaibaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KchaibaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KchaibaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
