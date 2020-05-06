import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KechenComponent } from './kechen.component';

describe('KechenComponent', () => {
  let component: KechenComponent;
  let fixture: ComponentFixture<KechenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KechenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KechenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
