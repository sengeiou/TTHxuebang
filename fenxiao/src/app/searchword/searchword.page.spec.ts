import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchwordPage } from './searchword.page';

describe('SearchwordPage', () => {
  let component: SearchwordPage;
  let fixture: ComponentFixture<SearchwordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchwordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchwordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
