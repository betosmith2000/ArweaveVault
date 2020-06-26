import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassHomeComponent } from './pass-home.component';

describe('PassHomeComponent', () => {
  let component: PassHomeComponent;
  let fixture: ComponentFixture<PassHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
