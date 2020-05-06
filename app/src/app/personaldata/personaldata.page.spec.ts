import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaldataPage } from './personaldata.page';

describe('PersonaldataPage', () => {
  let component: PersonaldataPage;
  let fixture: ComponentFixture<PersonaldataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaldataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaldataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
