import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeshiPage } from './ceshi.page';

describe('CeshiPage', () => {
  let component: CeshiPage;
  let fixture: ComponentFixture<CeshiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeshiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeshiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
