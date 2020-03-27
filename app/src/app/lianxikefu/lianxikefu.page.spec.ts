import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LianxikefuPage } from './lianxikefu.page';

describe('LianxikefuPage', () => {
  let component: LianxikefuPage;
  let fixture: ComponentFixture<LianxikefuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LianxikefuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LianxikefuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
