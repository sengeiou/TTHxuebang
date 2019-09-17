import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JgdetailsPage } from './jgdetails.page';

describe('JgdetailsPage', () => {
  let component: JgdetailsPage;
  let fixture: ComponentFixture<JgdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JgdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JgdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
