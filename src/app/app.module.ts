import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { InforComponent } from './infor/infor.component';
import { HomeComponent } from './home/home.component';
import { GaleryComponent } from './galery/galery.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { RegistroComponent } from './registro/registro.component';
<<<<<<< HEAD
import { AuthService } from './servicios/auth.service';
=======
import { ConfiguracionComponent } from './configuracion/configuracion.component';
>>>>>>> 7ce8c3c69bbd09af402f6538e5df3f83f76412be

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InforComponent,
    HomeComponent,
    GaleryComponent,
    LoginComponent,
    ProfileComponent,
    HomeScreenComponent,
    RegistroComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
