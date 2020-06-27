import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard} from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'passwords', loadChildren: () => import('./passwords/passwords.module').then(m => m.PasswordsModule) , canActivate:[AuthGuard] } ,  
  { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) , canActivate:[AuthGuard] },  
  { path: 'images', loadChildren: () => import('./images/images.module').then(m => m.ImagesModule) , canActivate:[AuthGuard] },  
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
