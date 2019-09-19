import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuliuPage } from './wuliu.page';

describe('WuliuPage', () => {
  let component: WuliuPage;
  let fixture: ComponentFixture<WuliuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuliuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuliuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
