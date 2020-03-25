import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingjiaPage } from './pingjia.page';

describe('PingjiaPage', () => {
  let component: PingjiaPage;
  let fixture: ComponentFixture<PingjiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingjiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingjiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
