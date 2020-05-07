import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjigouComponent } from './addjigou.component';

describe('AddjigouComponent', () => {
  let component: AddjigouComponent;
  let fixture: ComponentFixture<AddjigouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjigouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjigouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
