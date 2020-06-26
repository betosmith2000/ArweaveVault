import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'passwords', loadChildren: () => import('./passwords/passwords.module').then(m => m.PasswordsModule) },  
  { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) },  
  { path: 'images', loadChildren: () => import('./images/images.module').then(m => m.ImagesModule) },  
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
