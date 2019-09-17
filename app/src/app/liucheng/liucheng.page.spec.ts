import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiuchengPage } from './liucheng.page';

describe('LiuchengPage', () => {
  let component: LiuchengPage;
  let fixture: ComponentFixture<LiuchengPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiuchengPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiuchengPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
