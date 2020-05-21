import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderincomeComponent } from './orderincome.component';

describe('OrderincomeComponent', () => {
  let component: OrderincomeComponent;
  let fixture: ComponentFixture<OrderincomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderincomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
