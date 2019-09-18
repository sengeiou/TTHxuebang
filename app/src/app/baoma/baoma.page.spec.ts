import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaomaPage } from './baoma.page';

describe('BaomaPage', () => {
  let component: BaomaPage;
  let fixture: ComponentFixture<BaomaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaomaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
