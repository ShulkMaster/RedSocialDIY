// nativo de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// dependecias de terceros

// componentes creados
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { InforComponent } from './infor/infor.component';
import { HomeComponent } from './home/home.component';
import { GaleryComponent } from './galery/galery.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from './servicios/auth.service';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PublicacionComponent } from './publicacion/publicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InforComponent,
    HomeComponent,
    GaleryComponent,
    LoginComponent,
    ProfileComponent,
    RegistroComponent,
    ConfiguracionComponent,
    PublicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
