import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuikuanPage } from './tuikuan.page';

describe('TuikuanPage', () => {
  let component: TuikuanPage;
  let fixture: ComponentFixture<TuikuanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuikuanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuikuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
