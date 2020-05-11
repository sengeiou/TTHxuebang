import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopykechenComponent } from './copykechen.component';

describe('CopykechenComponent', () => {
  let component: CopykechenComponent;
  let fixture: ComponentFixture<CopykechenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopykechenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopykechenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
