import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopmallPage } from './shopmall.page';

describe('ShopmallPage', () => {
  let component: ShopmallPage;
  let fixture: ComponentFixture<ShopmallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopmallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopmallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
