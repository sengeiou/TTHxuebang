import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcinfoPage } from './kcinfo.page';

describe('KcinfoPage', () => {
  let component: KcinfoPage;
  let fixture: ComponentFixture<KcinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
