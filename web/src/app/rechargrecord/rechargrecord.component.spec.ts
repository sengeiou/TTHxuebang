import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargrecordComponent } from './rechargrecord.component';

describe('RechargrecordComponent', () => {
  let component: RechargrecordComponent;
  let fixture: ComponentFixture<RechargrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
