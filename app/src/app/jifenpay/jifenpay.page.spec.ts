import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JifenpayPage } from './jifenpay.page';

describe('JifenpayPage', () => {
  let component: JifenpayPage;
  let fixture: ComponentFixture<JifenpayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JifenpayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JifenpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
