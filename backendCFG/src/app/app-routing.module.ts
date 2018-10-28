import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InforComponent } from './infor/infor.component';
import { GaleryComponent } from './galery/galery.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'infor', component: InforComponent},
  { path: 'galery', component: GaleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
