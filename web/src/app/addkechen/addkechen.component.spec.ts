import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkechenComponent } from './addkechen.component';

describe('AddkechenComponent', () => {
  let component: AddkechenComponent;
  let fixture: ComponentFixture<AddkechenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddkechenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddkechenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
