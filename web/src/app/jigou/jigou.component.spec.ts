import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JigouComponent } from './jigou.component';

describe('JigouComponent', () => {
  let component: JigouComponent;
  let fixture: ComponentFixture<JigouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JigouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JigouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
