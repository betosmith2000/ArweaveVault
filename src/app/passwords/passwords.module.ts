import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassHomeComponent } from './pass-home/pass-home.component';
import { PassNewComponent } from './pass-new/pass-new.component';
import { Routes, RouterModule } from '@angular/router';
import {ShareModule} from '../share/share.module';

const routes: Routes = [
  { path: '', component: PassHomeComponent },

];

@NgModule({
  declarations: [PassHomeComponent, PassNewComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class PasswordsModule { }
