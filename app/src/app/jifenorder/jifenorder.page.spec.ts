import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JifenorderPage } from './jifenorder.page';

describe('JifenorderPage', () => {
  let component: JifenorderPage;
  let fixture: ComponentFixture<JifenorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JifenorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JifenorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
