import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingcedatiPage } from './pingcedati.page';

describe('PingcedatiPage', () => {
  let component: PingcedatiPage;
  let fixture: ComponentFixture<PingcedatiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingcedatiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingcedatiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
