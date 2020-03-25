import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehuinfoPage } from './kehuinfo.page';

describe('KehuinfoPage', () => {
  let component: KehuinfoPage;
  let fixture: ComponentFixture<KehuinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehuinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehuinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
