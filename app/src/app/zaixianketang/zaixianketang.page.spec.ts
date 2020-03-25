import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaixianketangPage } from './zaixianketang.page';

describe('ZaixianketangPage', () => {
  let component: ZaixianketangPage;
  let fixture: ComponentFixture<ZaixianketangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaixianketangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaixianketangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
