import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaixianketanPage } from './zaixianketan.page';

describe('ZaixianketanPage', () => {
  let component: ZaixianketanPage;
  let fixture: ComponentFixture<ZaixianketanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaixianketanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaixianketanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
