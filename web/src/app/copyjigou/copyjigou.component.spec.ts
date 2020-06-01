import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyjigouComponent } from './copyjigou.component';

describe('CopyjigouComponent', () => {
  let component: CopyjigouComponent;
  let fixture: ComponentFixture<CopyjigouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyjigouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyjigouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
