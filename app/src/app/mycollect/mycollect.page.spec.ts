import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycollectPage } from './mycollect.page';

describe('MycollectPage', () => {
  let component: MycollectPage;
  let fixture: ComponentFixture<MycollectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycollectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycollectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
