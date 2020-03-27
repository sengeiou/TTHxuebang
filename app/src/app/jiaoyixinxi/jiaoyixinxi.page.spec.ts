import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiaoyixinxiPage } from './jiaoyixinxi.page';

describe('JiaoyixinxiPage', () => {
  let component: JiaoyixinxiPage;
  let fixture: ComponentFixture<JiaoyixinxiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiaoyixinxiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiaoyixinxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
