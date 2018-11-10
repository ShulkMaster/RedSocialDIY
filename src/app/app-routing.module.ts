import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InforComponent } from './infor/infor.component';
import { GaleryComponent } from './galery/galery.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
<<<<<<< HEAD
import { ProfileComponent } from './profile/profile.component';
=======
>>>>>>> b262152a817a1eb07fc589b76ad39595af2becc6


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'infor', component: InforComponent},
  { path: 'galery', component: GaleryComponent},
  { path: 'login', component: LoginComponent},
<<<<<<< HEAD
  { path: 'registro', component: RegistroComponent},
  { path: 'profile', component: ProfileComponent},
=======
  { path: 'registro', component: RegistroComponent}
>>>>>>> b262152a817a1eb07fc589b76ad39595af2becc6
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
