import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiaokuanPage } from './tiaokuan.page';

describe('TiaokuanPage', () => {
  let component: TiaokuanPage;
  let fixture: ComponentFixture<TiaokuanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiaokuanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiaokuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
