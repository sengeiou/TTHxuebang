import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmechanismPage } from './addmechanism.page';

describe('AddmechanismPage', () => {
  let component: AddmechanismPage;
  let fixture: ComponentFixture<AddmechanismPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmechanismPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmechanismPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
