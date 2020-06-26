import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteNewComponent } from './note-new/note-new.component';
import { NoteHomeComponent } from './note-home/note-home.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: NoteHomeComponent },

];

@NgModule({
  declarations: [ NoteNewComponent, NoteHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class NotesModule { }
