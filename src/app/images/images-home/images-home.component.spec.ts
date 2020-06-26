import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesHomeComponent } from './images-home.component';

describe('ImagesHomeComponent', () => {
  let component: ImagesHomeComponent;
  let fixture: ComponentFixture<ImagesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
