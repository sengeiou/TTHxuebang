import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageinfoPage } from './messageinfo.page';

describe('MessageinfoPage', () => {
  let component: MessageinfoPage;
  let fixture: ComponentFixture<MessageinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
