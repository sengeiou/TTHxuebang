import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcyaoqinPage } from './kcyaoqin.page';

describe('KcyaoqinPage', () => {
  let component: KcyaoqinPage;
  let fixture: ComponentFixture<KcyaoqinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcyaoqinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcyaoqinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
