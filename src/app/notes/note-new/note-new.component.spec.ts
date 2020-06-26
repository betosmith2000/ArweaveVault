import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteNewComponent } from './note-new.component';

describe('NoteNewComponent', () => {
  let component: NoteNewComponent;
  let fixture: ComponentFixture<NoteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
