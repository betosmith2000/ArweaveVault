import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNewComponent } from './pass-new.component';

describe('PassNewComponent', () => {
  let component: PassNewComponent;
  let fixture: ComponentFixture<PassNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
