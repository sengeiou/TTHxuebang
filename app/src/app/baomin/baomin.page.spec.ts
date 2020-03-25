import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaominPage } from './baomin.page';

describe('BaominPage', () => {
  let component: BaominPage;
  let fixture: ComponentFixture<BaominPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaominPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaominPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
