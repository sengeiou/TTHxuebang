import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopmalldetailPage } from './shopmalldetail.page';

describe('ShopmalldetailPage', () => {
  let component: ShopmalldetailPage;
  let fixture: ComponentFixture<ShopmalldetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopmalldetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopmalldetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
