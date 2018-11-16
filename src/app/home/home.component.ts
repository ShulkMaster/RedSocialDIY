import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../classes/usuario';
import { PublicacionComponent } from '../publicacion/publicacion.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  publicaciones: PublicacionComponent[];

  constructor(private session: AuthService, private dataserver: DataService) {
    this.publicaciones = new Array();
    console.log('Home constructor fired from home');
  }

  ngOnInit() {
    this.dataserver.getpostfeed().subscribe((info: any) => {
      if (info.status) {
        info.data.forEach(element => {
          // console.log('este elemneto es una publicacion', element);
          // this.publicaciones.push(new PublicacionComponent(element));
        });
      }
    });
  }

  dodata() {
    console.log('data reached');
    this.dataserver.getpostfeed().subscribe(
      (data: any) => {
        console.log('goteen from API:', data);
      });
  }

  checkuserage() {
    if (this.session.myUser.edad >= 10) {
      console.log('su usuario si es mayor de eedad', this.session.myUser);
      return true;
    }
    return false;
  }

}
