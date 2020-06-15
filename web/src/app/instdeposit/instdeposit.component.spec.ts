import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstdepositComponent } from './instdeposit.component';

describe('InstdepositComponent', () => {
  let component: InstdepositComponent;
  let fixture: ComponentFixture<InstdepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstdepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
