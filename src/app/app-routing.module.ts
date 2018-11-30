import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InforComponent } from './infor/infor.component';
import { GaleryComponent } from './galery/galery.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { EditorComponent } from './editor/editor.component';

// Guardias
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'infor', component: InforComponent},
  { path: 'galery', component: GaleryComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'profile/MyUser', component: ProfileComponent},
  { path: 'profile/:user', component: ProfileComponent},
  { path: 'home', component: HomeComponent},
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'post/:user/:postname/edit', component: EditorComponent, canActivate: [AuthGuard]},
  { path: 'post/:user/:postname', component: PublicacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
