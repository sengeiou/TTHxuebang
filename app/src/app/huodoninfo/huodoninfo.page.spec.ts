import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuodoninfoPage } from './huodoninfo.page';

describe('HuodoninfoPage', () => {
  let component: HuodoninfoPage;
  let fixture: ComponentFixture<HuodoninfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuodoninfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuodoninfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
