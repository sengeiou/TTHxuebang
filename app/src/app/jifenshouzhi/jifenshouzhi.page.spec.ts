import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JifenshouzhiPage } from './jifenshouzhi.page';

describe('JifenshouzhiPage', () => {
  let component: JifenshouzhiPage;
  let fixture: ComponentFixture<JifenshouzhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JifenshouzhiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JifenshouzhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
