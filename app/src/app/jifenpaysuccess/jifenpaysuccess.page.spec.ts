import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JifenpaysuccessPage } from './jifenpaysuccess.page';

describe('JifenpayPage', () => {
  let component: JifenpaysuccessPage;
  let fixture: ComponentFixture<JifenpaysuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JifenpaysuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JifenpaysuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
