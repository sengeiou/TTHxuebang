import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcdetailsPage } from './kcdetails.page';

describe('KcdetailsPage', () => {
  let component: KcdetailsPage;
  let fixture: ComponentFixture<KcdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
