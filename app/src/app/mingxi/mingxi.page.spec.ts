import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MingxiPage } from './mingxi.page';

describe('MingxiPage', () => {
  let component: MingxiPage;
  let fixture: ComponentFixture<MingxiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MingxiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MingxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
