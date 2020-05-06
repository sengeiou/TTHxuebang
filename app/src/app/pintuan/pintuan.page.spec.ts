import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PintuanPage } from './pintuan.page';

describe('PintuanPage', () => {
  let component: PintuanPage;
  let fixture: ComponentFixture<PintuanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PintuanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PintuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
