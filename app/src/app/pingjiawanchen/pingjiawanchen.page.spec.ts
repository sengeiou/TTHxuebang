import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingjiawanchenPage } from './pingjiawanchen.page';

describe('PingjiawanchenPage', () => {
  let component: PingjiawanchenPage;
  let fixture: ComponentFixture<PingjiawanchenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingjiawanchenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingjiawanchenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
