import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainPage } from './maintain.page';

describe('MaintainPage', () => {
  let component: MaintainPage;
  let fixture: ComponentFixture<MaintainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
