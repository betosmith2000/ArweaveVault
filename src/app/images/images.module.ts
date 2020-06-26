import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesHomeComponent } from './images-home/images-home.component';
import { ImagesNewComponent } from './images-new/images-new.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ImagesHomeComponent },

];

@NgModule({
  declarations: [ImagesHomeComponent, ImagesNewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class ImagesModule { }
