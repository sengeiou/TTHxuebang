import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiemuxianqinPage } from './jiemuxianqin.page';

describe('JiemuxianqinPage', () => {
  let component: JiemuxianqinPage;
  let fixture: ComponentFixture<JiemuxianqinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiemuxianqinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiemuxianqinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
