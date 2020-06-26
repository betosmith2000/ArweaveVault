import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesNewComponent } from './images-new.component';

describe('ImagesNewComponent', () => {
  let component: ImagesNewComponent;
  let fixture: ComponentFixture<ImagesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
